<script>
  import { goto } from "$app/navigation";

  import { AuthService } from "$lib/logic/auth/auth.service";
  import { AuthState } from "$lib/logic/auth/auth.state";
  import { fade } from "svelte/transition";

  let userState = AuthState.userState;
  let authService = AuthService.get();
  let expanded = false;

  let signOut = () => {
    goto("/login", { replaceState: true });
    expanded = false;
    authService.signOut();
  };
</script>

<div class="relative p-1 rounded-full cursor-pointer bg-zinc-700 hover:bg-zinc-300">
  <img src="{$userState?.avatar_url}" alt="avatar" class="h-8 max-w-none" on:click={() => (expanded = !expanded)}>
  {#if expanded}
    <div class="z-20">
      <div
        transition:fade={{ duration: 200 }}
        class="fixed opacity-50 bg-zinc-900 w-full h-full top-0 left-0 z-10"
        on:click={() => (expanded = false)}
      />
      <div
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <a
            on:click={signOut}
            href="/#"
            class="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0">Sign out</a
          >
        </div>
      </div>
    </div>
  {/if}
</div>
