import type { Position } from '@threlte/core';
import { writable, type Writable } from 'svelte/store';
export const cursorPosition: Writable<Position> = writable({x:0,y:0,z:0});