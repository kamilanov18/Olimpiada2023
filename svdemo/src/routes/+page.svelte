<script lang='ts'>
	import { Canvas } from '@threlte/core';
	import Scene from '../components/Scene.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
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
    <Scene data={data} />
  </Canvas>
</div>