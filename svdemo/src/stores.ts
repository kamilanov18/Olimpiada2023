import type { Position } from '@threlte/core';
import { writable, type Writable } from 'svelte/store';
import type { ConstellationData, StarData } from './types';
export const cursorPosition: Writable<Position> = writable({x:0,y:0,z:0});
export const isCursorVisible: Writable<boolean> = writable(false);
export const targetStar: Writable<StarData> = writable({id:'', rightAscencion:0, declination:0, parallax:0, pseudocolor:'',mag:0, coordinates:{x:0,y:0,z:0}});
export const isConstellationsVisible: Writable<boolean> = writable(false);
export const isMakingConstellation: Writable<boolean> = writable(false);
export const currentConstellation: Writable<ConstellationData> = writable({name:'',discoverer:'',connections:[], viewedFromStarId:0});
export const constellationStartingStar:Writable<StarData> = writable({id:0, rightAscencion:0, declination:0, parallax:0, pseudocolor:'',mag:0, coordinates:{x:0,y:0,z:0}});
export const constellationEndingStar:Writable<StarData> = writable({id:0, rightAscencion:0, declination:0, parallax:0, pseudocolor:'',mag:0, coordinates:{x:0,y:0,z:0}});
export const isLoadingRender:Writable<boolean> = writable(false);
export const isBackgroundRotating: Writable<boolean> = writable(true);