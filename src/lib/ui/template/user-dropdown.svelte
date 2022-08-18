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

<div class="relative md:inline-block text-left">
  <span
    class="px-4 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 relative z-30 cursor-pointer"
    on:click={() => (expanded = !expanded)}
  >
    Welcome {$userState?.login ?? "loading"}
  </span>
  {#if expanded}
    <div class="z-20">
      <div
        transition:fade={{ duration: 200 }}
        class="fixed opacity-50 bg-zinc-900 w-full h-full top-0 left-0 z-10"
        on:click={() => (expanded = false)}
      />
      <div
        class="origin-top-right relative md:absolute right-0 mt-2 md:w-56 md:rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
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
