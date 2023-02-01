<script lang="ts">
	import { Instance, T, type Position, type ThreltePointerEvent } from '@threlte/core';
	import type { StarData } from 'src/types';
	import type { Object3D } from 'three';

    export let starData: StarData;
    export let cursorTarget:Object3D

    const onPointerEnter = (e: CustomEvent<ThreltePointerEvent>) => {
        console.log("vutre sum");
        console.log("before: "+cursorTarget.position.x);
        if(starData.coordinates.x&&starData.coordinates.y&&starData.coordinates.z)
            cursorTarget.position.set(starData.coordinates.x,starData.coordinates.y,starData.coordinates.z)
        console.log("after: "+cursorTarget.position.x);
        cursorTarget=cursorTarget;
    }
</script>

<Instance on:pointerenter={onPointerEnter} color={0xffffff} position={starData.coordinates} />