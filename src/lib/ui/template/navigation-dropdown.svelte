<script lang="ts">
  import { fade } from "svelte/transition";
  import EllipsisVertical from "../shared/icon/ellipsis-vertical.svelte";

  let expanded = false;

  const toggleDropdown = () => {
    console.log("toggle")
    expanded = !expanded;
  }
</script>

<div class="cursor-pointer" />

<div
  class="relative p-1 rounded-full cursor-pointer hover:bg-zinc-700 flex"
  on:click={toggleDropdown}
>
  <EllipsisVertical />
  {#if expanded}
    <div class="z-20">
      <div
        transition:fade={{ duration: 200 }}
        class="fixed opacity-50 bg-zinc-900 w-full h-full top-0 left-0 z-10"
      />
      <div
        class="origin-top-right absolute right-0 top-8 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <a
            href="/transactions"
            class="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0">Transactions</a
          >
        </div>
      </div>
    </div>
  {/if}
</div>
