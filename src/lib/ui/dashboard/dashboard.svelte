<script>
  import { dailyState } from "$lib/logic/database/graph/balance";
  import { categoryCountState } from "$lib/logic/database/graph/category";
  import { balanceConfig } from "../graph/balance-config";
  import { categoryCountConfig } from "../graph/category-config";
  import GraphShell from "../graph/graph-shell.svelte";
</script>

<div class="h-[400px]">
  <GraphShell
    title="Categories"
    data={categoryCountState}
    config={categoryCountConfig}
    maxWidth="400px"
  />
</div>
<div class="h-[400px]">
  <GraphShell
    title="Balance"
    data={dailyState}
    config={balanceConfig}
    maxWidth="400px"
  />
</div>
