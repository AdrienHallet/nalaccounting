<script lang="ts">
  import { AuthState } from "$lib/logic/auth/auth.state";
  import NavigationDropdown from "./navigation-dropdown.svelte";
  import Poller from "./poller.svelte";
  import UserDropdown from "./user-dropdown.svelte";

  let isAuthenticated = AuthState.isAuthenticated;
</script>

<header class="sticky top-0 z-50 bg-zinc-900">
  <nav
    class="relative flex flex-wrap items-center justify-between px-2 py-3  mb-3"
  >
    <div
      class="container px-4 mx-auto flex flex-row items-center justify-between"
    >
      <div class="w-full flex justify-between px-4 static">
        <a
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
          href="/"
        >
          NALACCOUNTING
        </a>
      </div>
      {#if $isAuthenticated}
        <div class="flex flex-grow items-center">
          <ul class="hidden md:block">
            <li class="flex items-center">
              <a href="/transactions">Transactions</a>
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
