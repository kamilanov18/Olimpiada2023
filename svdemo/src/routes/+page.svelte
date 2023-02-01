<script lang='ts'>
	import * as THREE from 'three';
	import { Canvas, Line2, OrbitControls, type PerspectiveCamera, T, Instance } from '@threlte/core';
    import { Environment, HTML } from '@threlte/extras'
    import Star from '../components/Star.svelte';
    import type { PageData } from './$types';
	// import TrackBallControls from 'src/components/TrackBallControls.svelte';
	import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

    export let data: PageData;
    const stars = data.stars.data;

    let hoverElement;
    let camera:PerspectiveCamera;
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
  <HTML bind:this={hoverElement} transform position={{x:0,y:0,z:0}}>
    <span style="background-color:red; color:white;">A</span>
  </HTML>
    <T.GridHelper />
        <Environment path ='./' files={'black_background.png'} isBackground={true} />
        <T.PerspectiveCamera makeDefault near={0.001} position={[1,1,1]}>
            <OrbitControls keys={{LEFT: 'a',RIGHT:'d',UP:'w',BOTTOM:'s'}} zoomSpeed={10} enableDamping dampingFactor={0.09} />
        </T.PerspectiveCamera>

        <Line2
          points={[     
            [0,0,0],
            [0, 2, 1],
            [-1, 1, 4]
          ]}
          material={new LineMaterial({
            worldUnits: true,
            linewidth:0.00007
          })}
        />

        <T.Mesh material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(0.001)} position={[0,0,0]} />
        <T.Mesh material={new THREE.MeshStandardMaterial({color: 0xfff00,emissive:0xffff00})} geometry={new THREE.SphereGeometry(0.1)} position={[0,0,1]} />

        <T.InstancedMesh id="stars" interactive material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(1e-4)}>
            {#each stars as star}
                {console.log(star)}
                <Star id={star[0]} rightAscension={star[1]} declination={star[2]} distance={((1/star[3]))*3.26} />
            {/each}
            <Instance />
        </T.InstancedMesh>
</Canvas>
</div>