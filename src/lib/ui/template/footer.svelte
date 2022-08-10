<script>
import Adrien from "../svg/adrien.svelte";
</script>

<footer class="pb-3 lg:pb-6 w-full bottom-0 bg-blueGray-800">
    <div class="container mx-auto px-4">
        <hr class="mb-1 border-b-1 border-blueGray-600"> 
        <div class="flex flex-wrap items-center md:justify-between justify-center">
            <div class="w-full md:w-4/12 px-4">
                <div class="text-sm text-blueGray-500 font-semibold text-center md:text-left">
                    Adrien <i class="w-5 inline-block align-middle"><Adrien></Adrien></i> Hallet
                </div>
            </div> 
            <div class="w-full md:w-8/12 px-4">
                <ul class="flex flex-wrap list-none md:justify-end justify-center">
                    <li><a href="/about" class="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3">About</a></li> 
                </ul>
            </div>
        </div>
    </div>
</footer>