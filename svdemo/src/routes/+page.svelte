<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import Star from './../components/Star.svelte';
</script>

<SC.Canvas>
    <Star pos={[1,1,1]} radius={0.05}/>
    <Star pos={[1,2,1]} radius={0.05}/>
    <Star pos={[1,3,1]} radius={0.05}/>
    <Star pos={[1,4,1]} radius={0.05}/>
	<SC.PerspectiveCamera position={[1, 1, 1]} />
    <SC.OrbitControls></SC.OrbitControls>
</SC.Canvas>