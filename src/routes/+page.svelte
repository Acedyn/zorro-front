<script lang="ts">
  import NodeGraph from '@/lib/components/NodeGraph.svelte';
  import { foo } from '@/lib/store/tools';
</script>

<NodeGraph/>
<button on:click={foo}>TEST ME</button>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>
