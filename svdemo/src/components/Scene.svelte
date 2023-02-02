<script lang='ts'>
    import * as THREE from 'three';
    import { OrbitControls, PerspectiveCamera, T, InstancedMesh, type Position, Object3D, useThrelte } from '@threlte/core';
    import { Environment, HTML } from '@threlte/extras';
    import Star from '../components/Star.svelte';
    import type { StarData } from 'src/types';
    import type { PageData } from '../routes/$types';
	import { cursorPosition, isCursorVisible, targetStar} from '../stores'
    import { tweened } from 'svelte/motion';
    
    export let data: PageData;
    let stars: StarData[] = data.stars;
    let targetedStar: StarData = {id:0, rightAscencion:0, declination:0, parallax:0, coordinates:{x:0,y:0,z:0}};

    let testCur: THREE.Object3D = new THREE.Sprite( new THREE.SpriteMaterial( { 
        map: new THREE.TextureLoader().load( 'cursor.png' ), 
        color: 0xffffff } 
    ) );
    
    testCur.scale.set(0.0007,0.001,1);
    testCur.position.set(0,0,0);
    const { scene } = useThrelte();
    scene.add(testCur);

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

    cursorPosition.subscribe((val:any)=>{
        testCur.position.set(val.x,val.y,val.z);
    });

    isCursorVisible.subscribe((val:any)=>{
        testCur.visible=val;
    });

    targetStar.subscribe((val:StarData)=>{
        targetedStar=val;
        tweenedOrbitControlTargetCoordinates.set(targetedStar.coordinates);
    });

    tweenedOrbitControlTargetCoordinates.subscribe((val:any)=>{
        orbitControls.target=val
    });
</script>

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
