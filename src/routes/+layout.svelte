<script>
  import { guard } from "$lib/logic/auth/auth-guard";
  import Footer from "$lib/ui/template/footer.svelte";
  import Header from "$lib/ui/template/header.svelte";
  import "../app.css";

  // Guard all routes
  guard();
</script>

<div class="flex flex-col justify-items-center min-h-screen">
  <div class="flex-initial">
    <Header />
  </div>
  <div class="container mx-auto px-2">
    <slot />
  </div>
  
  <div class="relative bottom-0 left-0 right-0 mt-auto">
    <Footer />
  </div>
</div>
