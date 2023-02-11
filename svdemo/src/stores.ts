import type { Position } from '@threlte/core';
import { writable, type Writable } from 'svelte/store';
import type { StarData } from './types';
export const cursorPosition: Writable<Position> = writable({x:0,y:0,z:0});
export const isCursorVisible: Writable<boolean> = writable(false);
export const targetStar: Writable<StarData> = writable({id:0, rightAscencion:0, declination:0, parallax:0, pseudocolor:'',mag:0, coordinates:{x:0,y:0,z:0}});
export const starList: Writable<StarData[]> = writable([]);
export const isConstellationsVisible: Writable<boolean> = writable(false);