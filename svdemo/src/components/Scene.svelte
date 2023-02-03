<script lang='ts'>
    import * as THREE from 'three';
    import { OrbitControls, PerspectiveCamera, T, InstancedMesh, type Position } from '@threlte/core';
    import { Environment } from '@threlte/extras';
    import Star from '../components/Star.svelte';
    import type { StarData } from 'src/types';
    import type { PageData } from '../routes/$types';
	import { targetStar} from '../stores'
    import { tweened } from 'svelte/motion';
	import HoverCursor from './HoverCursor.svelte';
    
    export let data: PageData;
    let stars: StarData[] = data.stars;
    let targetedStar: StarData = {id:0, rightAscencion:0, declination:0, parallax:0, coordinates:{x:0,y:0,z:0}};
    
    let tweenedOrbitControlTargetCoordinates = tweened<Position>({x:0,y:0,z:0}, {
        duration:500
    });

    let orbitControls = {
        enableDamping:true,
        dampingFactor: 0.09,
        target: {x:0,y:0,z:0}
    }

    let camera = {
        near:1e-4,
        position: {x:1,y:1,z:1},
        lookAt: targetedStar.coordinates,
    }

    targetStar.subscribe(async (val:StarData)=>{
        if(val.coordinates.x==0&&val.coordinates.y==0&&val.coordinates.z==0) return;
        targetedStar=val;
        tweenedOrbitControlTargetCoordinates.set(targetedStar.coordinates);

        // SELECT * FROM gaia_dr2.gaia_source
        // WHERE 1=CONTAINS(POINT( 'ICRS', gaia_source.ra, gaia_source.dec), CIRCLE('ICRS', ra_center, dec_center, radius))

        //ORDER BY SQRT(POWER(gaia_source.ra - ra_center, 2) + POWER(gaia_source.dec - dec_center, 2))

        let q1 = `SELECT+TOP+2000+source_id,ra,dec,parallax+FROM+gaiadr3.gaia_source+WHERE+1=CONTAINS(POINT(ra,dec),BOX(${targetedStar.rightAscencion},${targetedStar.declination},10,1))+AND+parallax+BETWEEN+1+AND+2`;

        const res = await fetch(`http://localhost:5173?query=${q1}`,{method:'GET'});
        stars = await res.json();
    });

    tweenedOrbitControlTargetCoordinates.subscribe((val:any)=>{
        orbitControls.target=val
    });
</script>

<form action="GET">
    <input name="query">
</form>

<HoverCursor />
<T.GridHelper />
<Environment path ='./' files={'black_background.png'} isBackground={true} />

<PerspectiveCamera {...camera} >
    <OrbitControls {...orbitControls} />
</PerspectiveCamera>

<T.Mesh material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(0.001)} position={[0,0,0]} />
<T.Mesh material={new THREE.MeshStandardMaterial({color: 0xfff00,emissive:0xffff00})} geometry={new THREE.SphereGeometry(0.1)} position={[0,0,1]}  />

<InstancedMesh interactive material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(1e-3)}>
    {#each stars as star }
        <Star starData={star} />
    {/each}
</InstancedMesh>
