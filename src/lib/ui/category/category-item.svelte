<script lang="ts" context="module">
  let editedCategory: any = () => {};
</script>

<script lang="ts">
  import { CATEGORIES_LAYOUT } from "./category.consts";
  import { Category } from "$lib/logic/model/category";
  import { deleteCategory, updateCategory } from "$lib/logic/database/category/operations";

  export let category: Category;
  let originalCategory: Category = new Category(category);
  let isEditing: boolean;

  const update = () => {
    if (!originalCategory.equals(category)) {
      updateCategory(category);
      originalCategory = new Category(category);
    }
  };

  $: category, transactionChange();
  const transactionChange = () => {
    if (category.id != originalCategory.id) {
      originalCategory = new Category(category);
    } else {
      update();
    }
  };

  const setEditing = () => {
    editedCategory();
    editedCategory = () => {
      isEditing = false;
    };
    isEditing = true;
  };

  const onClickRemove = () => {
    deleteCategory(category);
  };

  const editingClasses = `border-2 border-gray-100 bg-zinc-600 ${CATEGORIES_LAYOUT}`;
</script>

<span
  class={isEditing ? editingClasses : `${CATEGORIES_LAYOUT}`}
  on:click={setEditing}
  on:keydown={setEditing}
>
  <div class="">
    <input
      class="bg-transparent w-full text-ellipsis"
      bind:value={category.name}
      readonly={!isEditing}
      on:focus={setEditing}
    />
  </div>
  <div class="text-center">
    <svg
      on:click={onClickRemove}
      on:keydown={onClickRemove}
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 inline-block cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  </div>
</span>
