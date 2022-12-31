<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let show = false;

  const dispatch = createEventDispatcher();
  function backdropClick() {
    dispatch("backdropClick");
  }
</script>

{#if show}
  <div
    class="relative z-40"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="fixed inset-0 bg-zinc-900 bg-opacity-50 transition-opacity" />

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        on:click|self={backdropClick}
        on:keypress={backdropClick}
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-zinc-400 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-zinc-400 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <slot name="body" />
              </div>
            </div>
          </div>
          <div
            class="bg-zinc-500 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
