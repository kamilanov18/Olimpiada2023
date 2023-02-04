<script lang="ts">
	import Login from '../components/Login.svelte';
	import Register from '../components/Register.svelte';
import {
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		Styles
	} from 'sveltestrap/src';

  //isHamburger
	let isOpen = false;
	function handleUpdate(event: any) {
		isOpen = event.detail.isOpen;
	}

  //logout
	let isLoggedIn = false;
	function toggleLogin() {
		isLoggedIn = !isLoggedIn;
	}
</script>

<Styles />
<Navbar color="dark" dark expand="md">
	<NavbarBrand href="/index">StarIndex</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav class="ms-auto" navbar>
			<NavItem>
				<NavLink href="https://github.com/kamilanov18/Olimpiada2023">GitHub</NavLink>
			</NavItem>
		</Nav>
		<Nav navbar class="ml-auto">
			{#if !isLoggedIn}

      <!-------------REGISTER------------->

<Register ></Register>
        <!-------------/REGISTER------------->

      <Login></Login>

			{:else}
				<NavItem>
					<NavLink href="#" on:click={toggleLogin}>Logout</NavLink>
				</NavItem>
			{/if}
		</Nav>
	</Collapse>
</Navbar>
<div class="center-items">
	<slot ></slot>
</div>

<style>
	:global(*) {
		color: aliceblue;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}
	:global(div.modal-content) {
		background-color: rgb(42, 46, 53) !important;
	}
	:global(body){
    background: linear-gradient(176deg,rgb(18,24,27) 50%,rgb(32,39,55) 100%);;
    background-attachment: fixed;
	}
	:global(.center-items){
		display:grid;
		place-items:center;
	}

</style>
