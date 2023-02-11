<script lang='ts'>
    import * as THREE from 'three';
    import { OrbitControls, PerspectiveCamera, T, InstancedMesh, type Position, Pass, Group } from '@threlte/core';
    import { Environment } from '@threlte/extras';
    import Star from '../components/Star.svelte';
    import type { ConstellationData, StarData } from 'src/types';
	import { isConstellationsVisible, targetStar} from '../stores';
    import { tweened } from 'svelte/motion';
	import HoverCursor from './HoverCursor.svelte';
	import TargetCursor from './TargetCursor.svelte';
	import Constellation from './Constellation.svelte';
    import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';
	import type { PageData } from '../routes/atlas/$types';

    export let data: PageData;
    let stars: StarData[];
    let displayConstellations = false;
    let constellations: ConstellationData[];
    let targetedStar: StarData = {id:0, rightAscencion:0, declination:0, parallax:0,pseudocolor:'',mag:0, coordinates:{x:0,y:0,z:0}};

    stars = data.stars;
    constellations = data.constellations;
    
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
        if(targetedStar.id===val.id) return;
        if(val.coordinates.x==0&&val.coordinates.y==0&&val.coordinates.z==0) {
            tweenedOrbitControlTargetCoordinates.set({x:0,y:0,z:0});
            const res = await fetch(`http://localhost:5173/atlas?isInitial=true`,{method:'GET'});
            stars = await res.json();
            return;
        }
        targetedStar=val;
        console.log("testetststetst"+targetedStar)
        tweenedOrbitControlTargetCoordinates.set(targetedStar.coordinates);
        
        const res = await fetch(`http://localhost:5173/atlas?isInitial=false&ra=${targetedStar.rightAscencion}&dec=${targetedStar.declination}&p=${targetedStar.parallax}`,{method:'GET'});
        stars = await res.json();
        console.log(stars.length);
    });

    tweenedOrbitControlTargetCoordinates.subscribe((val:any)=>{
        orbitControls.target=val
    });

    isConstellationsVisible.subscribe((val:boolean)=>{
        displayConstellations=val;
    });
</script>

<Pass pass={new UnrealBloomPass(new THREE.Vector2( window.innerWidth, window.innerHeight ), 1, 0.5, 0)} />

<HoverCursor />
<TargetCursor />
<T.GridHelper />

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

<Group visible={displayConstellations}>
    {#each constellations as constellation }
        <Constellation constellation={constellation} />
    {/each}
</Group>


