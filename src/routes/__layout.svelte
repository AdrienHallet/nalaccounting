<script>
	import Footer from '$lib/ui/template/footer.svelte';
	import Header from '$lib/ui/template/header.svelte';
	import '../app.css'
</script>

<div class="flex flex-col h-screen justify-items-center">
	<div class="flex-initial">
		<Header></Header>
	</div>
	<div class="flex flex-auto px-4">
		<slot></slot>
	</div>
	<div class="flex">
		<Footer></Footer>
	</div>
</div>
