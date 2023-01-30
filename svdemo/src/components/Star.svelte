<script lang="ts">
    import * as THREE from 'three';
	import { T, type ThreltePointerEvent } from '@threlte/core';

    export let radius:number;
    export let rightAscension: number; // lat
    export let declination: number;    // lon
    export let distance: number;

    const spawnHTML = (e: CustomEvent<ThreltePointerEvent>) => {
        console.log(e);
    }

    function Radians(degrees: number)
    {
        return degrees*Math.PI/180;
    }

    function get3DCoordinates(): [number,number,number] {
        let ra = Radians(rightAscension);
        let dec = Radians(declination);
        // let x = distance * Math.sin(ec) * Math.cos(ra);
        // let y = distance * Math.sin(dec) * Math.sin(ra);
        // let z = distance * Math.cos(dec) * Math.sign(dec);
        let x = distance* Math.cos(dec)*Math.cos(ra);
        let y = distance*Math.cos(dec)*Math.sin(ra);
        let z = distance*Math.sin(dec);
        return [x,y,z];
    }
</script>

<T.Mesh  material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} position={get3DCoordinates()} geometry={new THREE.SphereGeometry(radius)}/>