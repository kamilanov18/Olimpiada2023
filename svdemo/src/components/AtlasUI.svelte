<script lang='ts'>

  import { enhance } from "$app/forms";
	import { currentConstellation, isConstellationsVisible, isMakingConstellation, targetStar } from "../stores";
  import { Button, Card, Col, Input, Row } from "sveltestrap";
	import type { ActionData } from "../routes/atlas/$types";
	import type { ConstellationData } from "src/types";

  export let form: ActionData;
  
  function centerSun() {
    targetStar.set({id:0, rightAscencion:0, declination:0, parallax:0,pseudocolor:'',mag:0, coordinates:{x:0,y:0,z:0}});
  }

  let displayConstellations = false;
  let isInConstellationCreationMode = false;
  let constellation: ConstellationData;

  currentConstellation.subscribe((val:ConstellationData)=>{
    constellation=val;
  }) 

  function toggleConstellations() {
    displayConstellations=!displayConstellations;
    isConstellationsVisible.set(displayConstellations);
  }

  function toggleConstellationMode() {
    isInConstellationCreationMode=!isInConstellationCreationMode
    isMakingConstellation.set(isInConstellationCreationMode);
  }

  function generateConstellation() {
    console.log(constellation);
  }

  function resetConstellation() {
    currentConstellation.set({name:'',discoverer:'',connections:[]});
  }
</script>

<Row><Col><Button>AAA</Button></Col></Row>

<Card>
  <form use:enhance method='POST' action='/atlas?/find'>
    <Input name="ra" id="ra" placeholder="Right Ascension" required />
    <Input name="dec" id="dec" placeholder="Declination" required />
    <Row><Col><Button type="submit">Find Star</Button></Col></Row>
    {#if form?.success}
      {console.log(form.star)}
      {targetStar.set(form.star)}
      <p>success</p>
    {:else if !form?.success}
      <p>fail</p>
    {/if}
  </form>
</Card>
<Row><Col><Button on:click={centerSun}>Center Sun</Button></Col></Row>
<Row>
  <Col><Button on:click={toggleConstellations}> 
    {#if displayConstellations==true}
      Hide 
    {:else}
      Show
    {/if}
    Constellations
  </Button></Col>
</Row>
<Row>
  <Button on:click={toggleConstellationMode}>
    {#if isInConstellationCreationMode==true}
      Leave creation 
    {:else}
      Enter creation
    {/if}
    Mode
  </Button>
  <Card>
    <!-- <form use:enhance > -->
      <!-- <Input id='const-name' name='const-name' /> -->
      <Button color='success'  on:click={generateConstellation} >Submit</Button>
      <Button color='danger' on:click={resetConstellation} >Reset</Button>
    <!-- </form> -->
  </Card>
</Row>