<script lang="ts">
	import { Instance, type ThreltePointerEvent, useThrelte, PointLight } from '@threlte/core';
	import type { StarData } from 'src/types';
    import { cursorPosition, isCursorVisible, targetStar } from '../stores'
    export let starData: StarData;

    const onPointerEnter = (e: CustomEvent<ThreltePointerEvent>) => {
        console.log("Pointer enter: "+starData.id);
        cursorPosition.set(starData.coordinates);
        isCursorVisible.set(true);
        document.body.style.cursor = 'pointer';
    }

    const onPointerLeave = (e: CustomEvent<ThreltePointerEvent>) => {
        console.log("Pointer leave: "+starData.id);
        isCursorVisible.set(false);
        document.body.style.cursor = 'auto';
    }

    const onClick = (e: CustomEvent<ThreltePointerEvent>) => {
        console.log("Pointer click: "+starData.id);
        targetStar.set(starData);
    }
</script>

<Instance on:pointerleave={onPointerLeave} on:pointerenter={onPointerEnter} on:click={onClick}  color={starData.pseudocolor ?? 0xffffff} position={starData.coordinates} />