<script>
  import { isLoading } from "$lib/logic/loading/loading.state";
  import { LOADING_COMPONENT } from "$lib/logic/loading/loading.enum";
  import CategoryList from "$lib/ui/category/category-list.svelte";
  import Loading from "$lib/ui/shared/loading.svelte";
  
</script>

{#if $isLoading.get(LOADING_COMPONENT.CATEGORIES)}
<div class="flex flex-grow justify-center h-[200px] align-middle">
  <Loading />  
</div>
  
{:else}
  <CategoryList />
{/if}
