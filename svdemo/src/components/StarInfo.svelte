<script lang='ts'>
	import type { StarData } from "src/types";
	import { Card } from "sveltestrap";

    export let starData: StarData
</script>
    
<style>
    .infotext {
        color:black
    }
</style>

<Card>
    <p class='infotext' >Given Name: </p>
    <p class='infotext' >Scientific Name: </p>
    <p class='infotext' >Discovered By: </p>
    <p class='infotext' >Right Ascension: {starData.rightAscencion}</p>
    <p class='infotext' >Declination: {starData.declination}</p>
    <p class='infotext'>Parallax: {starData.parallax}</p>
    <p class='infotext'>Apparent magnitude: {starData.mag}</p>
</Card>