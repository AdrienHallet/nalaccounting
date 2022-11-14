<script>
  import { page } from "$app/stores";
</script>

Tst:
<h1>{$page.status}: {$page?.error?.message}</h1>
