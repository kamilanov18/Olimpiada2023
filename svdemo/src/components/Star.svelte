<script lang="ts">
	import { Instance, type ThreltePointerEvent, useThrelte, PointLight, T } from '@threlte/core';
	import type { StarData } from 'src/types';
	import { MeshStandardMaterial, SphereGeometry } from 'three';
    import { cursorPosition, isCursorVisible, targetStar } from '../stores'
    export let starData: StarData;

    const onPointerEnter = (e: CustomEvent<ThreltePointerEvent>) => {
        cursorPosition.set(starData.coordinates);
        isCursorVisible.set(true);
        document.body.style.cursor = 'pointer';
    }

    const onPointerLeave = (e: CustomEvent<ThreltePointerEvent>) => {
        isCursorVisible.set(false);
        document.body.style.cursor = 'auto';
    }

    const onClick = (e: CustomEvent<ThreltePointerEvent>) => {
        console.log("Pointer click: "+starData.id);
        console.log(starData.rightAscencion,starData.declination)
        targetStar.set(starData);
    }
</script>

<Instance on:pointerleave={onPointerLeave} on:pointerenter={onPointerEnter} on:click={onClick} color={starData.pseudocolor} position={starData.coordinates} />
<T.Mesh 
    position={[Number(starData.coordinates.x),Number(starData.coordinates.y),Number(starData.coordinates.z)]} 
    material={new MeshStandardMaterial({color:starData.pseudocolor, emissive:starData.pseudocolor})} 
    geometry={new SphereGeometry((1e-3)*starData.mag)} 
/>