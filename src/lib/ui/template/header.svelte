<script lang="ts">
import { AuthState } from "$lib/logic/auth/auth.state";
import databaseExporter from "$lib/logic/database/database-exporter";
import Poller from './poller.svelte';

let isMenuExpanded = false;
let userState = AuthState.userState;
let isAuthenticated = AuthState.isAuthenticated;
</script>

<header>
	<nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-zinc-900 mb-3">
		<div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
		  	<div class="w-full relative flex justify-between md:w-auto  px-4 md:static md:block md:justify-start">
				<span class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
					NALACCOUNTING
				</span>
				<button class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none" 
					type="button"
					on:click={() => isMenuExpanded = !isMenuExpanded}>
					[{isMenuExpanded ? '-' : '+'}]
				</button>
		  	</div>
			{#if $isAuthenticated}
		  	<div class="md:flex flex-grow items-center"
				class:hidden={!isMenuExpanded}>
				<ul class="flex flex-col md:flex-row list-none ml-auto">
					<li class="nav-item flex flex-row">
						<Poller></Poller>
					</li>
					<li class="nav-item">
						<a class="px-4 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/">
							Welcome { $userState?.login ?? 'loading' }
						</a>
					</li>
				</ul>
		  	</div>
			{/if}
		</div>
	</nav>
</header>