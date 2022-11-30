<script lang="ts">
  import { onMount, tick } from "svelte";

  // props
  export let items: any[];
  export let classes: string;

  // read-only, but visible to consumers via bind:start
  export let start = 0;
  export let end = 0;

  // local state
  let height_map: number[] = [];
  let rows: HTMLCollectionOf<HTMLElement>;
  let viewport: HTMLElement;
  let contents: HTMLElement;
  let viewport_height = 0;
  let visibleItem: any[];
  let mounted = false;

  let top = 0;
  let bottom = 0;
  let average_height: number;

  $: visibleItem = items.slice(start, end).map((data, i) => {
    return { index: i + start, data };
  });

  // whenever `items` changes, invalidate the current heightmap
  $: if (mounted) refresh(items, viewport_height);

  async function refresh(items: any, viewport_height: number) {
    const { scrollTop } = viewport;

    await tick(); // wait until the DOM is up to date

    let content_height = top - scrollTop;
    let i = start;

    while (content_height < viewport_height && i < items.length) {
      let row = rows[i - start];

      if (!row) {
        end = i + 1;
        await tick(); // render the newly visible row
        row = rows[i - start];
      }
      
      const row_height = (height_map[i] = row.offsetHeight);
      content_height += row_height;
      i += 1;
    }

    end = i;

    const remaining = items.length - end;
    average_height = (top + content_height) / end;

    bottom = remaining * average_height;
    height_map.length = items.length;
  }

  async function handle_scroll() {
    const { scrollTop } = viewport;

    const old_start = start;

    for (let v = 0; v < rows.length; v += 1) {
      height_map[start + v] = rows[v].offsetHeight;
    }

    let i = 0;
    let y = 0;

    while (i < items.length) {
      const row_height = height_map[i] || average_height;
      if (y + row_height > scrollTop) {
        start = i;
        top = y;

        break;
      }

      y += row_height;
      i += 1;
    }

    while (i < items.length) {
      y += height_map[i] || average_height;
      i += 1;

      if (y > scrollTop + viewport_height) break;
    }

    end = i;

    const remaining = items.length - end;
    average_height = y / end;

    while (i < items.length) height_map[i++] = average_height;
    bottom = remaining * average_height;

    // prevent jumping if we scrolled up into unknown territory
    if (start < old_start) {
      await tick();

      let expected_height = 0;
      let actual_height = 0;

      for (let i = start; i < old_start; i += 1) {
        if (rows[i - start]) {
          expected_height += height_map[i];
          actual_height += rows[i - start].offsetHeight;
        }
      }

      const d = actual_height - expected_height;
      viewport.scrollTo(0, scrollTop + d);
    }
  }

  // trigger initial refresh
  onMount(() => {
    rows = contents.getElementsByTagName("viewport-row") as HTMLCollectionOf<HTMLElement>;
    mounted = true;
  });
</script>

<viewport
  bind:this={viewport}
  bind:offsetHeight={viewport_height}
  on:scroll={handle_scroll}
  class="h-full {classes}"
>
  <slot name="header"/>
  <viewport-contents
    bind:this={contents}
    style="padding-top: {top}px; padding-bottom: {bottom}px;"
  >
    {#each visibleItem as row (row.index)}
      <viewport-row>
        <slot name="row" item={row.data}>Missing template</slot>
      </viewport-row>
    {/each}
  </viewport-contents>
</viewport>

<style>
  viewport {
    position: relative;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    display: block;
  }

  viewport-contents,
  viewport-row {
    display: block;
  }

  viewport-row {
    overflow: hidden;
  }
</style>
