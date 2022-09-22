<script>
	import Footer from '$lib/ui/template/footer.svelte';
	import Header from '$lib/ui/template/header.svelte';
	import '../app.css'
</script>

<div class="flex flex-col justify-items-center min-h-screen">
	<div class="flex-initial">
		<Header></Header>
	</div>
	<slot></slot>
	<div class="relative bottom-0 left-0 right-0 mt-auto">
		<Footer></Footer>
	</div>
</div>
