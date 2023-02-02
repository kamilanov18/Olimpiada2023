<script lang="ts">
	import { Instance, type ThreltePointerEvent, useThrelte } from '@threlte/core';
	import type { StarData } from 'src/types';
    import { cursorPosition, isCursorVisible, targetStar } from '../stores'
    export let starData: StarData;

    const onPointerEnter = (e: CustomEvent<ThreltePointerEvent>) => {
        console.log(e)
        console.log("vutre sum");
        cursorPosition.set(starData.coordinates);
        isCursorVisible.set(true);
    }

    const onPointerLeave = (e: CustomEvent<ThreltePointerEvent>) => {

        console.log("navun sum");
        isCursorVisible.set(false);
    }

    const onClick = (e: CustomEvent<ThreltePointerEvent>) => {
        console.log("kliknah");
        targetStar.set(starData);
    }
</script>


<Instance on:pointerleave={onPointerLeave} on:pointerenter={onPointerEnter} on:click={onClick}  color={0xffffff} position={starData.coordinates} />