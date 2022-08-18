<script lang="ts">
  import changelog from "../../../CHANGELOG.md?raw";
  import parser from "$lib/logic/changelog/parser";

  // Todo can probably only happen once per server startup
  let parsedChangelog = parser(changelog) || [];
</script>

<div id=changelog class="grid grid-cols-1 gap-6 lg:gap-8 mx-[10%] py-5">
  {#each parsedChangelog as entry}
    <div class="bg-zinc-700 rounded-lg p-4">
      <span class="text-2xl font-extrabold">{entry.title}</span>
      <br />
      <span class="text-md">Released: {entry.date.toISOString().split("T")[0]}</span>
      <hr class="pb-3" />
      {@html entry.content}
    </div>
  {/each}
</div>

<style>
  #changelog :global(ul) {
    @apply list-disc list-inside
  }

  #changelog :global(li > ul) {
    @apply ml-5
  }
</style>
