<script lang="ts">
    import LoginForm from "./LoginForm.svelte";
  </script>
  
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black has-text-centered">Login to Placemark App</h3>
          <div class="box">
            <LoginForm />
          </div>
          <p class="has-text-centered">Don't have an account yet? <a href="/signup" data-cy="signup-redirect">Signup Here</a></p>
        </div>
      </div>
    </div>
  </section>
  