<script lang="ts">
	import Login from '../components/Login.svelte';
	import Register from '../components/Register.svelte';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';
	import {
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		Styles,
		Button
	} from 'sveltestrap/src';
	import { page } from '$app/stores';

	console.log($page.data.user);

	//isHamburger
	let isOpen = false;
	function handleUpdate(event: any) {
		isOpen = event.detail.isOpen;
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
			{#if !$page.data.user}
				<!-------------REGISTER------------->

				<Register />
				<!-------------/REGISTER------------->

				<Login />
			{/if}
			{#if $page.data.user}
				<NavItem>
					<NavLink href="/uploadPhoto">Upload A Photo</NavLink>
				</NavItem>
				<NavItem>
					<form
						method="POST"
						action="/logout"
						use:enhance={() => {
							return async ({ result }) => {
								invalidateAll();
								await applyAction(result);
							};
						}}
					>
						<Button color="light" type="submit" outline>Logout</Button>
					</form>
				</NavItem>
			{/if}
		</Nav>
	</Collapse>
</Navbar>
<div class="center-items">
	<slot />
</div>

<style>
	:global(*) {
		color: aliceblue;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}
	:global(div.modal-content) {
		background-color: rgb(42, 46, 53) !important;
	}
	:global(body) {
		background: linear-gradient(176deg, rgb(18, 24, 27) 50%, rgb(32, 39, 55) 100%);
		background-attachment: fixed;
	}
	:global(.center-items) {
		display: grid;
		place-items: center;
	}
</style>
