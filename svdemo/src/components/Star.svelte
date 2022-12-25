<script lang="ts">
    import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import type { Position } from 'svelte-cubed/types/common';

    export let radius:number;
    export let rightAscension: number=0; // lat
    export let declination: number=0;    // lon
    export let distance: number=0;
    //export let name: string;

    function get3DCoordinates(flattening:1|0=0):Position {
        const celestialRadius = 110;
        let ls = Math.atan((1-flattening)**2 * Math.tan(rightAscension))
        let x = celestialRadius * Math.cos(ls) * Math.cos(declination) + distance * Math.cos(rightAscension) * Math.cos(declination);
        let y = celestialRadius * Math.cos(ls) * Math.sin(declination) + distance * Math.cos(rightAscension) * Math.sin(declination);
        let z = celestialRadius * Math.sin(ls) + distance * Math.sin(rightAscension);
        return [x,y,z];
    }
</script>

<SC.Mesh position={get3DCoordinates()} geometry={new THREE.SphereGeometry(radius)}/>