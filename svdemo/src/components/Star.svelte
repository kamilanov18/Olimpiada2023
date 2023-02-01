<script lang="ts">
	import { Instance, type ThreltePointerEvent } from '@threlte/core';
	import type { StarData } from 'src/types';
    import { cursorPosition } from '../stores'
    export let starData: StarData;


    const onPointerEnter = (e: CustomEvent<ThreltePointerEvent>) => {
        console.log("vutre sum");
        cursorPosition.set(starData.coordinates);
    }
</script>

<Instance on:pointerenter={onPointerEnter} color={0xffffff} position={starData.coordinates} />