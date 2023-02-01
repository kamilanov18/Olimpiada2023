<script lang="ts">
	import { Instance, T, type Position, type ThreltePointerEvent } from '@threlte/core';
	import { degToRad } from 'three/src/math/MathUtils';

    export let id:number;
    export let rightAscension: number; // lat
    export let declination: number;    // lon
    export let distance: number;
    let coordinatesIn3DSpace = get3DCoordinates();

    const onPointerEnter = (e: CustomEvent<ThreltePointerEvent>) => {
        const distanceToMesh = e.detail.distance;
        console.log("test: "+distanceToMesh);
    }

    function get3DCoordinates(): Position/*[number,number,number]*/ {
        let ra = degToRad(rightAscension);
        let dec = degToRad(declination);
        let x = distance* Math.cos(dec)*Math.cos(ra);
        let y = distance*Math.cos(dec)*Math.sin(ra);
        let z = distance*Math.sin(dec);
        return {x,y,z};
    }
</script>

<Instance id={id.toString()} on:pointerenter={onPointerEnter} color={0xffffff} position={coordinatesIn3DSpace} />