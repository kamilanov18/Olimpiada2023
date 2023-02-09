<script lang='ts'>
    import * as THREE from 'three';
    import { OrbitControls, PerspectiveCamera, T, InstancedMesh, type Position, Pass, AmbientLight } from '@threlte/core';
    import { Environment } from '@threlte/extras';
    import Star from '../components/Star.svelte';
    import type { ConstellationData, StarData } from 'src/types';
    import type { PageData } from '../routes/$types';
	import { targetStar} from '../stores'
    import { tweened } from 'svelte/motion';
	import HoverCursor from './HoverCursor.svelte';
	import TargetCursor from './TargetCursor.svelte';
	import Constellation from './Constellation.svelte';
    
    export let data: PageData;
    let stars: StarData[] = data.stars;
    let targetedStar: StarData = {id:0, rightAscencion:0, declination:0, parallax:0,pseudocolor:'',mag:0, coordinates:{x:0,y:0,z:0}};
    
    let tweenedOrbitControlTargetCoordinates = tweened<Position>({x:0,y:0,z:0}, {
        duration:500
    });

    let constellation: ConstellationData = {
        name:'test',
        discoverer:'test',
        connections: [{startingStar:stars[0],endingStar:stars[1]}]
    };

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
        let query,sizeCoefficient=1.5;
        let parallaxLowerArc = targetedStar.parallax/(1-(sizeCoefficient/100)*targetedStar.parallax);
        let parallaxHigherArc = targetedStar.parallax/(1+(sizeCoefficient/100)*targetedStar.parallax);

        let factor = parallaxHigherArc/parallaxLowerArc;
        let figureDegrees = sizeCoefficient*targetedStar.parallax*factor;

        if(figureDegrees>90) figureDegrees=90;

        else if(targetedStar.parallax>20)
        {
            figureDegrees=30;
            parallaxLowerArc=767;
        }
        else if(parallaxLowerArc<0)
        {
            parallaxLowerArc=767;
            figureDegrees=70;
        }

        console.log(targetedStar.pseudocolor);
        console.log(targetedStar.mag);
        console.log(targetedStar.id);
        
        if(targetedStar.parallax>110)
        {
            query = 'SELECT+TOP+1000+source_id,ra,dec,parallax,teff_gspphot_upper,phot_g_mean_mag+FROM+gaiadr3.gaia_source+WHERE+parallax>0.1+ORDER+BY+parallax+DESC';
        } else {
            query = `SELECT+source_id,ra,dec,parallax,teff_gspphot_upper,phot_g_mean_mag+FROM+gaiadr3.gaia_source+WHERE+1=CONTAINS(POINT(ra,dec),CIRCLE(${targetedStar.rightAscencion},${targetedStar.declination},${figureDegrees}))+AND+parallax+BETWEEN+${parallaxHigherArc}+AND+${parallaxLowerArc}`;
        }
        
        const res = await fetch(`http://localhost:5173?query=${query}`,{method:'GET'});
        stars = await res.json();
        console.log(stars.length);
    });

    tweenedOrbitControlTargetCoordinates.subscribe((val:any)=>{
        orbitControls.target=val
    });
</script>

<HoverCursor />
<TargetCursor />
<T.GridHelper />
<!-- <Pass pass={new UnrealBloomPass()} /> -->
<Environment path ='./' files={'black_background.png'} isBackground={true} />

<PerspectiveCamera {...camera} >
    <OrbitControls {...orbitControls} />
</PerspectiveCamera>

<T.Mesh material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(0.001)} position={[0,0,0]} />
<T.Mesh material={new THREE.MeshStandardMaterial({color: 0xffff00,emissive:0xffff00})} geometry={new THREE.SphereGeometry(0.1)} position={[0,0,1]}  />
<T.Mesh material={new THREE.MeshStandardMaterial({color: 0xff00ff,emissive:0xff00ff})} geometry={new THREE.SphereGeometry(0.1)} position={[0,1,0]}  />
<T.Mesh material={new THREE.MeshStandardMaterial({color: 0x00ffff,emissive:0x00ffff})} geometry={new THREE.SphereGeometry(0.1)} position={[1,0,0]}  />

<InstancedMesh interactive material={new THREE.MeshStandardMaterial({transparent:true,opacity:0, depthWrite: false})} geometry={new THREE.SphereGeometry(1e-1)}>
    {#each stars as star }
        <Star starData={star} />
    {/each}
</InstancedMesh>

<Constellation constellation={constellation} />
