<script lang="ts">
    import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
    export let radius:number;
    export let pos: import('svelte-cubed/types/common').Position;
    let rightAscension=0;
    let declination=0;
    let distance=0;
</script>

<SC.Mesh position={pos} geometry={new THREE.SphereGeometry(radius)}/>

<!--<SC.Mesh position={pos} geometry={new THREE.SphereGeometry(radius)}/>-->