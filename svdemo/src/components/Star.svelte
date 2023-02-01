<script lang="ts">
	import { Instance, T, type Position, type ThreltePointerEvent } from '@threlte/core';
	import type { StarData } from 'src/types';

    export let starData: StarData;

    const onPointerEnter = (e: CustomEvent<ThreltePointerEvent>) => {
        const distanceToMesh = e.detail.distance;
        console.log("test: "+distanceToMesh);
    }
</script>

<Instance on:pointerenter={onPointerEnter} color={0xffffff} position={starData.coordinates} />