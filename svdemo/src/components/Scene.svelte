<script lang='ts'>
    import * as THREE from 'three';
    import { OrbitControls, PerspectiveCamera, T, InstancedMesh, type Position, Object3D } from '@threlte/core';
    import { Environment, HTML } from '@threlte/extras';
    import Star from '../components/Star.svelte';
    import type { StarData } from 'src/types';
    import type { PageData } from '../routes/$types';
	import { cursorPosition, isCursorVisible, targetStar} from '../stores'
    
    export let data: PageData;
    let stars: StarData[] = data.stars;
    let targetedStar: StarData = {id:0, rightAscencion:0, declination:0, parallax:0, coordinates:{x:0,y:0,z:0}};

    let cursor = {
        sprite:true,
        scale:0.00005,
        transform:true,
        position: {x:0,y:0,z:0},
        occlude:true
    };

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

    cursorPosition.subscribe((val:any)=>{
        cursor.position.x=val.x as number;
        cursor.position.y=val.y as number;
        cursor.position.z=val.z as number;
    });

    isCursorVisible.subscribe((val:any)=>{
        console.log(val);
        cursor.occlude=!val
    });

    targetStar.subscribe((val:StarData)=>{
        console.log(val);
        targetedStar=val;
        orbitControls.target.x=targetedStar.coordinates.x as number;
        orbitControls.target.y=targetedStar.coordinates.y as number;
        orbitControls.target.z=targetedStar.coordinates.z as number;
    });

</script>

<!-- svelte-ignore a11y-missing-attribute -->
<Object3D frustumCulled={false}>
    <HTML {...cursor} >
      <img  draggable="false" src="cursor.png">
    </HTML>
</Object3D>

<T.GridHelper />
<Environment path ='./' files={'black_background.png'} isBackground={true} />

<PerspectiveCamera {...camera} >
    <OrbitControls {...orbitControls} />
</PerspectiveCamera>

<T.Mesh material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(0.001)} position={[0,0,0]} />
<T.Mesh material={new THREE.MeshStandardMaterial({color: 0xfff00,emissive:0xffff00})} geometry={new THREE.SphereGeometry(0.1)} position={[0,0,1]}  />

<InstancedMesh interactive material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(1e-4)}>
    {#each stars as star }
        <Star starData={star} />
    {/each}
</InstancedMesh>
