<script lang="ts">
    import type { ActionData } from "./$types"
    import { Button } from 'sveltestrap';
  import Login from '../../components/Login.svelte';
    export let form: ActionData;

    


  </script>
  

  <div class="center-items">
      <h1>Login</h1>
  
    
    {#if form?.user}
      <p class="error">Username not found or incorrect password.</p>

      {:else if form?.user==null}
      <Login></Login>
      
    {/if}
  </div>