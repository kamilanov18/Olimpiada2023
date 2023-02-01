<script lang='ts'>
	import * as THREE from 'three';
	import { Canvas, OrbitControls, type PerspectiveCamera, T, InstancedMesh } from '@threlte/core';
  import { Environment, HTML } from '@threlte/extras'
  import Star from '../components/Star.svelte';
  import type { PageData } from './$types';
	import type { StarData } from 'src/types';

    export let data: PageData;
    const stars: StarData[] = data.stars;
</script>

<style>
    .canvas-container {
      position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
    }
</style>

<div class="canvas-container">
<Canvas >
  <!-- <HTML transform position={{x:0,y:0,z:0}}>
    <img src="../static/cursor.png">
  </HTML> -->
    <T.GridHelper />
        <Environment path ='./' files={'black_background.png'} isBackground={true} />
        <T.PerspectiveCamera makeDefault near={0.001} position={[1,1,1]}>
            <OrbitControls keys={{LEFT: 'a',RIGHT:'d',UP:'w',BOTTOM:'s'}} zoomSpeed={10} enableDamping dampingFactor={0.09} />
        </T.PerspectiveCamera>

        <T.Mesh material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(0.001)} position={[0,0,0]} />
        <T.Mesh material={new THREE.MeshStandardMaterial({color: 0xfff00,emissive:0xffff00})} geometry={new THREE.SphereGeometry(0.1)} position={[0,0,1]} />

        <InstancedMesh interactive material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(1e-4)}>
            {#each stars as star}
                <Star starData={star} />
            {/each}
        </InstancedMesh>
</Canvas>
</div>