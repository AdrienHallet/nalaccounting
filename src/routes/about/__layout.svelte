<script lang="ts">
  import Info from "$lib/ui/shared/icon/info-roundless.svelte";
  import Sparkles from "$lib/ui/shared/icon/sparkles.svelte";
  import {page} from "$app/stores"

  let cards = [
    {
      title: "The Project",
      icon: Info,
      link: "/about",
    },
    {
      title: "Changelog",
      icon: Sparkles,
      link: "/about/changelog",
    },
  ];
</script>

<div class="flex flex-col">
  <div
    class="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 mx-[10%]"
  >
    {#each cards as card}
      <a href={card.link}>
        <figure
          class:bg-zinc-600={$page.url.pathname === card.link}
          class="relative flex flex-col-reverse bg-zinc-700 rounded-lg p-6 shadow-lg hover:shadow-zinc-900"
        >
          <figcaption class="flex items-center space-x-4">
            <div
              class="flex w-8 h-8 md:w-14 md:h-14 rounded-full object-cover bg-zinc-400 text-black justify-center align-middle"
            >
              <svelte:component this={card.icon} />
            </div>

            <div class="flex-auto">
              <div class="text-base font-semibold">
                {card.title}
              </div>
            </div>
          </figcaption>
        </figure>
      </a>
    {/each}
  </div>
  <slot />
</div>
