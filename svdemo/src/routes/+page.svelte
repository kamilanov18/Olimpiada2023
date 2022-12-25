<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import Star from './../components/Star.svelte';
</script>

<SC.Canvas>
    <!--<SC.Mesh material={new THREE.MeshStandardMaterial({color: 0xffffff,emissive:0xffffff})} geometry={new THREE.SphereGeometry(110)} position={[0,0,0]}></SC.Mesh>-->
    
    <Star rightAscension={11.0621778} declination={55.9598333} distance={81} radius={1}/> <!--Dubhe 81-->
    <Star rightAscension={11.0306639} declination={56.3823333} distance={79} radius={1}/> <!--Merak 79-->
    <Star rightAscension={11.8971500} declination={53.6947222} distance={84} radius={1}/> <!--Phecda 84-->
    <Star rightAscension={12.2570694} declination={57.0326111} distance={81} radius={1}/> <!--Megrez 81-->
    <Star rightAscension={12.9004528} declination={55.9598333} distance={81} radius={1}/> <!--Alioth 81-->
    <Star rightAscension={13.3989806} declination={54.9218222} distance={83} radius={1}/> <!--Mizar 83-->
    <Star rightAscension={13.7923750} declination={49.3133056} distance={101} radius={1}/> <!--Alkaid 101-->
	<SC.PerspectiveCamera position={[1, 1, 1]} />
    <SC.OrbitControls></SC.OrbitControls>
</SC.Canvas>