<script lang='ts'>
	import * as THREE from 'three';
	import { Canvas, OrbitControls, T } from '@threlte/core';
    import { Environment } from '@threlte/extras'
    import Star from '../components/Star.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    const stars = data.stars.data;
</script>

<style>
    div {
      position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
    }
</style>

<div class="canvas-container">
<Canvas>
    <T.GridHelper />
        <Environment path ='./' files={'black_background.png'} isBackground={true} />
        <T.PerspectiveCamera makeDefault near={0.001} position={[1,1,1]}>
            <OrbitControls enableDamping dampingFactor={0.09} />
        </T.PerspectiveCamera>

        <T.Mesh material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(0.001)} position={[0,0,0]} />
        <T.Mesh material={new THREE.MeshStandardMaterial({color: 0xfff00,emissive:0xffff00})} geometry={new THREE.SphereGeometry(0.1)} position={[0,0,1]} />

        {#each stars as star}
            {console.log(star)}
            <Star rightAscension={star[1]} declination={star[2]} distance={((1/star[3]))*3.26} radius={1e-4}></Star>
        {/each}
</Canvas>
</div>