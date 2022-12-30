<script lang="ts">
  import { AuthState } from "$lib/logic/auth/auth.state";
  import Logo from "../../svg/logo.svelte";
  import Title from "../../svg/title.svelte";
  import NavigationDropdown from "./navigation-dropdown.svelte";
  import Poller from "../poller.svelte";
  import UserDropdown from "./user-dropdown.svelte";
  import HeaderLink from "./header-link.svelte";
  import { lastBalance } from "$lib/logic/database/graph/balance";
  import { amountFormat } from "$lib/ui/shared/formatters";

  let isAuthenticated = AuthState.isAuthenticated;
</script>

<header class="sticky top-0 z-40 bg-zinc-900">
  <nav class="relative flex flex-wrap items-center justify-between px-2 my-3">
    <div
      class="container px-4 mx-auto flex flex-row items-center justify-between"
    >
      <div class="flex px-4 static">
        <a href="/" class="flex static gap-2">
          <div class="flex self-center"><Logo classes="h-10" /></div>
          <div class="flex self-center">
            <Title classes="h-5 align-middle" />
          </div>
        </a>
      </div>
      {#if $isAuthenticated}
        <div class="w-full text-center text-xs hidden md:inline">
          Tot.: € {amountFormat($lastBalance.amount.toFixed(2))}
          </div>
        <div class="flex flex-grow flex-row items-center">
          <ul class="hidden md:flex flex-row gap-1 mr-2">
            <HeaderLink link="/transactions">Transactions</HeaderLink>
            <div class="m-auto">|</div>
            <HeaderLink link="/categories">Categories</HeaderLink>
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
