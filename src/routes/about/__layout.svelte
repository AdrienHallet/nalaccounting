<script lang="ts">
  import Github from "$lib/ui/shared/icon/github.svelte";

  import Sparkles from "$lib/ui/shared/icon/sparkles.svelte";

  let cards = [
    {
      title: "Changelog",
      icon: Sparkles,
      link: "/about/changelog",
    },
    {
      title: "GitHub",
      icon: Github,
      link: "/about/github",
    },
  ];
</script>

<div class="flex flex-col">
  <div
    class="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-2 mx-[10%]"
  >
    {#each cards as card}
      <a href={card.link}>
        <figure
          class="relative flex flex-col-reverse bg-zinc-700 hover:bg-zinc-600 rounded-lg p-6"
        >
          <blockquote class="mt-6 ">
            <p>A description</p>
          </blockquote>
          <figcaption class="flex items-center space-x-4">
            <div
              class="flex w-14 h-14 rounded-full object-cover bg-zinc-400 text-black justify-center align-middle"
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
  <div>
    <slot />
  </div>
</div>
