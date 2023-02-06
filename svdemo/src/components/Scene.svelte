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
        
        let parallaxLowerArc = targetedStar.parallax-(targetedStar.parallax/4);
        let parallaxHigherArc = targetedStar.parallax+(targetedStar.parallax/3);

        console.log("parallax: "+targetedStar.parallax);
        let factor = parallaxHigherArc/parallaxLowerArc;
        if(factor*20>90)
            factor=4.5;

        console.log(factor);
        let figureDegrees = 0.5*targetedStar.parallax*factor;
        if(figureDegrees>90)
            figureDegrees=90;
            
        console.log("circle degrees:"+figureDegrees);
        let q1 = `SELECT+source_id,ra,dec,parallax+FROM+gaiadr3.gaia_source+WHERE+1=CONTAINS(POINT(ra,dec),CIRCLE(${targetedStar.rightAscencion},${targetedStar.declination},${figureDegrees}))+AND+parallax+BETWEEN+${parallaxLowerArc}+AND+${parallaxHigherArc}`;
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
