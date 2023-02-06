<script lang='ts'>
    import * as THREE from 'three';
    import { OrbitControls, PerspectiveCamera, T, InstancedMesh, type Position } from '@threlte/core';
    import { Environment } from '@threlte/extras';
    import Star from '../components/Star.svelte';
    import type { StarData } from 'src/types';
    import type { PageData } from '../routes/$types';
	import { targetStar} from '../stores'
    import { tweened } from 'svelte/motion';
	import HoverCursor from './HoverCursor.svelte';
    
    export let data: PageData;
    let stars: StarData[] = data.stars;
    let targetedStar: StarData = {id:0, rightAscencion:0, declination:0, parallax:0, coordinates:{x:0,y:0,z:0}};
    
    let tweenedOrbitControlTargetCoordinates = tweened<Position>({x:0,y:0,z:0}, {
        duration:500
    });

    let orbitControls = {
        enableDamping:true,
        dampingFactor: 0.09,
        target: {x:0,y:0,z:0}
    }

    let camera = {
        near:1e-4,
        position: {x:1,y:1,z:1},
        lookAt: targetedStar.coordinates,
    }

    targetStar.subscribe(async (val:StarData)=>{
        if(val.coordinates.x==0&&val.coordinates.y==0&&val.coordinates.z==0) return;

        targetedStar=val;
        tweenedOrbitControlTargetCoordinates.set(targetedStar.coordinates);
        
        console.log('Stellar parallax: '+targetedStar.parallax);

        if(targetedStar.parallax>100) return;
        // let parallaxLowerArc = targetedStar.parallax-(targetedStar.parallax/4);
        // let parallaxHigherArc = targetedStar.parallax+(targetedStar.parallax/3);
        let parallaxLowerArc = targetedStar.parallax/(1-0.02*targetedStar.parallax);
        let parallaxHigherArc = targetedStar.parallax/(1+0.02*targetedStar.parallax);

        console.log('Upper arc parallax: '+parallaxHigherArc);
        console.log('Stellar parallax: '+targetedStar.parallax);
        console.log('Lower arc parallax: '+parallaxLowerArc);

        let factor = parallaxHigherArc/parallaxLowerArc;
        console.log(factor);

        // let figureDegrees = 1.3*targetedStar.parallax*factor;
        let figureDegrees = targetedStar.parallax*factor;
        console.log(figureDegrees);
        if(figureDegrees>90) figureDegrees=90;

        if(parallaxLowerArc<0)
        {
            parallaxLowerArc=767;
            figureDegrees=70;
        }

        let q1 = `SELECT+source_id,ra,dec,parallax+FROM+gaiadr3.gaia_source_lite+WHERE+1=CONTAINS(POINT(ra,dec),CIRCLE(${targetedStar.rightAscencion},${targetedStar.declination},${figureDegrees}))+AND+parallax+BETWEEN+${parallaxHigherArc}+AND+${parallaxLowerArc}`;
        const res = await fetch(`http://localhost:5173?query=${q1}`,{method:'GET'});
        stars = await res.json();
        console.log(stars.length);
    });

    tweenedOrbitControlTargetCoordinates.subscribe((val:any)=>{
        orbitControls.target=val
    });
</script>

<HoverCursor />
<T.GridHelper />
<Environment path ='./' files={'black_background.png'} isBackground={true} />

<PerspectiveCamera {...camera} >
    <OrbitControls {...orbitControls} />
</PerspectiveCamera>

<T.Mesh material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(0.001)} position={[0,0,0]} />
<T.Mesh material={new THREE.MeshStandardMaterial({color: 0xffff00,emissive:0xffff00})} geometry={new THREE.SphereGeometry(0.1)} position={[0,0,1]}  />
<T.Mesh material={new THREE.MeshStandardMaterial({color: 0xff00ff,emissive:0xff00ff})} geometry={new THREE.SphereGeometry(0.1)} position={[0,1,0]}  />
<T.Mesh material={new THREE.MeshStandardMaterial({color: 0x00ffff,emissive:0x00ffff})} geometry={new THREE.SphereGeometry(0.1)} position={[1,0,0]}  />

<InstancedMesh interactive material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(1e-4)}>
    {#each stars as star }
        <Star starData={star} />
    {/each}
</InstancedMesh>
