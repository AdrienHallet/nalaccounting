<script lang="ts">
    import { categories } from "$lib/logic/database/category/categories.state";
    import Button from "../shared/button.svelte";
    import VirtualScroll from "../shared/virtual/virtual-scroll.svelte";
  import CategoryItem from "./category-item.svelte";
  import { CATEGORIES_LAYOUT } from "./category.consts";
  import { addCategory } from "$lib/logic/database/category/operations";
  import type { Category } from "$lib/logic/model/category";
  
    let categoryVScroll: VirtualScroll;
  
    const add = () => {
      addCategory({
        name: "",
      } as unknown as Category);
      if (
        categoryVScroll.scroller != null &&
        categoryVScroll.slice != null
      ) {
        categoryVScroll.scroller();
        categoryVScroll.slice();
      }
    };
  </script>
  
  <div class="relative break-words w-full mb-6 rounded text-zinc-200">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg">Categories</h3>
        </div>
        <div>
          <Button primary on:click={add}>+ Add</Button>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto px-2 h-[75vh]">
      <VirtualScroll
        bind:this={categoryVScroll}
        items={$categories}
        classes="min-w-[500px]"
      >
        <div
          class="sticky top-0 overflow-hidden {CATEGORIES_LAYOUT} auto-rows-auto bg-zinc-800 border border-x-0"
          slot="header"
        >
          <div class="py-2 text-left">Name</div>
          <div class="py-2 text-left" />
        </div>
        <CategoryItem slot="row" let:item category={item} />
      </VirtualScroll>
    </div>
  </div>
  