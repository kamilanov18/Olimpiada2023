<script lang='ts'>
    import * as THREE from 'three';
    import { OrbitControls, PerspectiveCamera, T, InstancedMesh, type Position } from '@threlte/core';
    import { Environment, HTML } from '@threlte/extras'
    import Star from '../components/Star.svelte';
    import type { StarData } from 'src/types';
    import type { PageData } from '../routes/$types';
	import { Object3D } from 'three';

    export let data: PageData;
    const stars: StarData[] = data.stars;

    let currentStar: Object3D = new Object3D();
    let refObj = {
        position:[0,0,0]
    };
    let cursor = {
        sprite:true,
        scale:1e-4,
        transform:true,
        position: {x:0,y:0,z:0}
    };
    $: cursor.position = currentStar.position;
    $: console.log("REACTIVE: "+currentStar.position);
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<HTML {...cursor}>
  <img src="cursor.png">
</HTML> 

<T.Object3D position={[0,0,0]} bind:object={currentStar} />

<T.GridHelper />
<Environment path ='./' files={'black_background.png'} isBackground={true} />

<PerspectiveCamera near={1e-4} position={{x:1,y:1,z:1}}>
    <OrbitControls keys={{LEFT: 'a',RIGHT:'d',UP:'w',BOTTOM:'s'}} enableDamping dampingFactor={0.09} />
</PerspectiveCamera>

<T.Mesh material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(0.001)} position={[0,0,0]} />
<T.Mesh material={new THREE.MeshStandardMaterial({color: 0xfff00,emissive:0xffff00})} geometry={new THREE.SphereGeometry(0.1)} position={[0,0,1]} />

<InstancedMesh interactive material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(1e-4)}>
    {#each stars as star}
        <Star cursorTarget={currentStar} starData={star} />
    {/each}
</InstancedMesh>