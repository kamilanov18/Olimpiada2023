<script lang='ts'>
	import { Canvas } from '@threlte/core';
	import Scene from '../components/Scene.svelte';
  import AtlasUI from '../components/AtlasUI.svelte';
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
      z-index:-1;
    }
</style>

<AtlasUI />

<div class="canvas-container">
  <Canvas >
    <Scene data={data} />
  </Canvas>
</div>

