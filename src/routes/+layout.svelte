<script>
  import { guard } from "$lib/logic/auth/auth-guard";
  import Footer from "$lib/ui/template/footer.svelte";
  import Header from "$lib/ui/template/header.svelte";
  import "../app.css";

  // Guard all routes
  guard();
</script>

<Header />
<div class="container mx-auto px-2 mt-2">
  <slot />
</div>
<div class="mt-auto">
  <Footer />
</div>
