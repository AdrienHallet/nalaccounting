<script lang="ts">
  import { Type } from "./enums";


  export let type: Type;
  
  export let icon: string | null = null;
  let primaryClasses = "bg-white active:bg-zinc-500 px-4 py-2 rounded outline-none focus:outline-none mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs text-black ease-linear transition-all duration-150"
  let secondaryClasses = "bg-zinc-400 active:bg-zinc-500 px-4 py-2 rounded outline-none focus:outline-none mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs text-black ease-linear transition-all duration-150"

  let classes: string;
  switch(type) {
    case Type.PRIMARY:
      classes = primaryClasses;
      break;
    case Type.SECONDARY:
      classes = secondaryClasses;
      break;
    default:
      classes = ""
  }
</script>

<button
  class={classes};
  type="button"
  on:click
>
  {#if icon}
    <img alt="" class="w-5 mr-3" src={icon} />
  {/if}
  
  <slot /></button
>
