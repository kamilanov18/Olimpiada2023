<script lang='ts'>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import Star from './../components/Star.svelte';
    import DecStar from './../components/DecStar.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    const stars = data.stars.data;
</script>

<style>
    /* .demo {
        position:relative;
        width:100%;
        max-width:var(--linemax);
        height:var(--height, 300px);
    } */
</style>

<div class="demo">
    <SC.Canvas>
        <SC.Mesh material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(0.01)} position={[0,0,0]}></SC.Mesh>

        <SC.Mesh material={new THREE.MeshStandardMaterial({color: 0xffff00,emissive:0xffff00})} geometry={new THREE.SphereGeometry(0.1)} position={[0,0,1]}></SC.Mesh>

        <Star rightAscension={[11,3,43.84]} declination={[61,45,4]} distance={81} radius={1}/>          Dubhe 81
        <Star rightAscension={[11,1,50.39]} declination={[56,22,56.4]} distance={79} radius={1}/>       Merak 79
        <Star rightAscension={[11,53,49.74]} declination={[53,41,41]} distance={84} radius={1}/>        Phecda 84
        <Star rightAscension={[12,15,25.45]} declination={[57,1,57.4]} distance={81} radius={1}/>       Megrez 81
        <Star rightAscension={[12,54,1.63]} declination={[55,57,35.4]} distance={81} radius={1}/>       Alioth 81
        <Star rightAscension={[13,23,55.54]} declination={[54,55,31.3]} distance={83} radius={1}/>      Mizar 83
        <Star rightAscension={[13,47,32.55]} declination={[49,18,47.9]} distance={101} radius={1}/>     Alkaid 101

        {#each stars as star}
            {console.log(star)}
            <DecStar rightAscension={star[1]} declination={star[2]} distance={((1/star[3]))*3.26} radius={1e-3}></DecStar>
        {/each}

    	<SC.PerspectiveCamera position={[1, 1, 1]} />
        <SC.OrbitControls></SC.OrbitControls>
    </SC.Canvas>
</div>