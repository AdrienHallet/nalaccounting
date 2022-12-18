<script lang="ts">
  import { AuthState } from "$lib/logic/auth/auth.state";
  import Logo from "../svg/logo.svelte";
  import Title from "../svg/title.svelte";
  import NavigationDropdown from "./navigation-dropdown.svelte";
  import Poller from "./poller.svelte";
  import UserDropdown from "./user-dropdown.svelte";

  let isAuthenticated = AuthState.isAuthenticated;
</script>

<header class="sticky top-0 z-50 bg-zinc-900">
  <nav
    class="relative flex flex-wrap items-center justify-between px-2 my-3"
  >
    <div
      class="container px-4 mx-auto flex flex-row items-center justify-between"
    >
      <div class="w-full flex px-4 static">
        <a href="/" class="flex static gap-2">
          <div class="flex self-center"><Logo classes="h-10"/></div>
        <div class="flex self-center"><Title classes="h-5 align-middle"/></div>
        </a>
        
      </div>
      {#if $isAuthenticated}
        <div class="flex flex-grow flex-row items-center">
          <ul class="hidden md:flex flex-row gap-2">
            <li class="flex items-center">
              <a href="/transactions">Transactions</a>
            </li>
            <li class="flex items-center">
              <a href="/categories">Categories</a>
            </li>
          </ul>
          <ul class="flex flex-row list-none ml-auto">
            <li class="flex mr-2">
              <Poller />
            </li>
            <li class="md:hidden flex mr-2 my-auto">
              <NavigationDropdown />
            </li>
            <li>
              <UserDropdown />
            </li>
          </ul>
        </div>
      {/if}
    </div>
  </nav>
</header>
