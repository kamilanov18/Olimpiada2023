<script lang="ts">
    import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import type { Position } from 'svelte-cubed/types/common';

    export let radius:number;
    export let rightAscension: [number, number, number]; // lat
    export let declination: [number,number,number]    // lon
    export let distance: number;

    function Radians(degrees: number)
    {
        return degrees*Math.PI/180;
    }

    function get3DCoordinates(): Position {
        let ra = Radians((rightAscension[0] * 15) + (rightAscension[1] * 0.25) + (rightAscension[2] * 0.004166));
        let dec = Radians(( Math.abs(declination[0]) + (declination[1] / 60) + (declination[2] / 3600)) * Math.sign(declination[0]));
        let x = distance * Math.sin(dec) * Math.cos(ra);
        let y = distance * Math.sin(dec) * Math.sin(ra);
        let z = distance * Math.cos(dec);
        return [x,y,z];
    }

</script>

<SC.Mesh position={get3DCoordinates()} geometry={new THREE.SphereGeometry(radius)}/>