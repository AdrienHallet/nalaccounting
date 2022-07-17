<script>
import { goto } from '$app/navigation';

import { AuthService } from '$lib/logic/auth/auth.service';
    
    import Button from '$lib/ui/shared/button.svelte'

    const authService = AuthService.get();

    const authenticate = () => {
      authService.authenticate().then((token) => {
        console.log("Authenticated with token: " + token);
        goto('/', { replaceState: true });
      });
    }
</script> 

<div class="container mx-auto px-4 h-full text-slate-800">
  <div class="flex content-center items-center justify-center h-full">
    <div class="w-full lg:w-4/12 px-4">
      <div
        class="bg-gray-300 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
      >
        <div class="rounded-t mb-0 px-6 py-6">
          <div class="text-center mb-3">
            <h6 class="font-bold">Sign in with</h6>
          </div>
          <div class="btn-wrapper text-center">
            <Button primary icon="./github.svg" on:click={authenticate}>Github</Button>
          </div>
          <hr class="mt-6 border-b-1 border-blueGray-300" />
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0 ">
          <div class="text-center font-bold pb-5">What is this?</div>
          <div class="text-justify">
            GitHub is a third-party website we use for authentication and cloud storage purposes. If you don't have an account yet, register, it's free!
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
