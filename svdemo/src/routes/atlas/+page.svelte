<script lang='ts'>
	import { Canvas } from '@threlte/core';
	import Scene from '../../components/Scene.svelte';
  import AtlasUI from '../../components/AtlasUI.svelte';
	import type { ActionData, PageData } from './$types';
	import { Spinner } from 'sveltestrap';
	import { isLoadingRender } from '../../stores';

  export let data: PageData;
  export let form:ActionData;

  let isLoading = true;
  isLoadingRender.subscribe((val:boolean)=>{
    isLoading=val;
  })
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

    .controlls-container {
      padding: auto;
    }

    .visible {
      visibility: hidden;
    }
</style>

<div class="controlls-container">
  <AtlasUI form={form}/>
</div>

{#if isLoading}
  <Spinner color={'primary'} />
{/if}

<div class="canvas-container">
  <Canvas >
    <Scene data={data} />
  </Canvas>
</div>

