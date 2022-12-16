<script>
  import { isLoading } from "$lib/logic/loading/loading.state";
  import { LOADING_COMPONENT } from "$lib/logic/loading/loading.enum";
  import { DexieService } from "$lib/logic/database/dexie.service";
  import CategoryList from "$lib/ui/category/category-list.svelte";
</script>

{#if $isLoading.get(LOADING_COMPONENT.CATEGORIES)}
  loading
  {DexieService.get()}
{:else}
  <CategoryList />
{/if}
