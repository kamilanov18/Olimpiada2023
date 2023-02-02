<script lang="ts">
	import { onMount } from 'svelte';
	import type { Camera, Scene } from 'three';
    import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
    export let camera:Camera;
    export let element:HTMLCanvasElement;

    console.log(camera);
    console.log(element);
    

    const controls = new TrackballControls(camera,element);
    controls.noRotate = true;
	controls.noPan = true;
	controls.noZoom = false;
	controls.zoomSpeed = 1.5;
	controls.dynamicDampingFactor = 0.2;
    controls.update();
</script>

<p>a</p>