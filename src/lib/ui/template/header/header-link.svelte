<script lang="ts">
  export let link: string;
</script>

<li>
  <a
    class="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-700 hover:text-white "
    href={link}
  >
    <slot />
  </a>
</li>
