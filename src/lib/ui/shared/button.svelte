<script lang="ts">
  export let primary: any = null;
  export let icon: string | null = null;
  let primaryClasses = "bg-white active:bg-slate-500 px-4 py-2 rounded outline-none focus:outline-none mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs text-black ease-linear transition-all duration-150"
</script>

<button
  class={primary ? primaryClasses : ''};
  type="button"
  on:click
>
  {#if icon}
    <img alt="" class="w-5 mr-3" src={icon} />
  {/if}
  
  <slot /></button
>
