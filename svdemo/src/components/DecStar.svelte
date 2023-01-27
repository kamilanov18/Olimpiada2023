<script lang="ts">
    import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import type { Position } from 'svelte-cubed/types/common';

    export let radius:number;
    export let rightAscension: number; // lat
    export let declination: number;    // lon
    export let distance: number;

    function Radians(degrees: number)
    {
        return degrees*Math.PI/180;
    }

    function get3DCoordinates(): Position {
        let ra = Radians(rightAscension);
        let dec = Radians(declination);
        // let x = distance * Math.sin(dec) * Math.cos(ra);
        // let y = distance * Math.sin(dec) * Math.sin(ra);
        // let z = distance * Math.cos(dec) * Math.sign(dec);
        let x = distance* Math.cos(dec)*Math.cos(ra);
        let y = distance*Math.cos(dec)*Math.sin(ra);
        let z = distance*Math.sin(dec);
        return [x,y,z];
    }
</script>

<SC.Mesh position={get3DCoordinates()} geometry={new THREE.SphereGeometry(radius)}/>