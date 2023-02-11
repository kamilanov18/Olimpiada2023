<script lang='ts'>

  import { enhance } from "$app/forms";
	import { targetStar } from "../stores";
  import { Button, Card, Col, Form, Input, Row } from "sveltestrap";
	import type { ActionData } from "../routes/$types";
  export let form: ActionData;
  
  function centerSun() {
    targetStar.set({id:0, rightAscencion:0, declination:0, parallax:0,pseudocolor:'',mag:0, coordinates:{x:0,y:0,z:0}});
  }
</script>

<Row><Col><Button>AAA</Button></Col></Row>

<Card>
  <form use:enhance method='POST' action='?/find'>
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
<Row><Col><Button>Show / Hide Constellations</Button></Col></Row>