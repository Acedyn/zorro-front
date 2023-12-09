<script>
  import "../app.css";
  import { afterNavigate } from "$app/navigation";

  afterNavigate(() => {
    HSStaticMethods.autoInit();
  });
</script>

<slot />
