<script lang="ts">
  import { writable } from 'svelte/store';
  import { SvelteFlow } from '@xyflow/svelte';
  import CommandNode from './CommandNode.svelte';
  import SocketEdge from './SocketEdge.svelte';
 
  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import '@xyflow/svelte/dist/style.css';
 
  // We are using writables for the nodes and edges to sync them easily. When a user drags a node for example, Svelte Flow updates its position.
  const nodes = writable([
    {
      id: '1',
      type: 'command',
      data: { 
        label: writable('Input Node'),
        inputs: writable(["Foo parameter", "Bar parameter", "Baz parameter"]),
        outputs: writable(["Foo output"]),
        logs: writable(["Log A", "Log B", "Log C", "Log D"]),
        status: writable("COMPLETED")
      },
      position: { x: 0, y: 0 }
    },
    {
      id: '2',
      type: 'command',
      data: { 
        label: writable('Output'),
        inputs: writable(["Baz parameter"]),
        outputs: writable(["Grunt output"]),
        logs: writable(["Log A", "Log B"]),
        status: writable("RUNNING")
      },
      position: { x: 0, y: 150 }
    }
  ]);
 
  // same for edges
  const edges = writable([
    {
      id: '1-2',
      type: 'socket',
      source: '1',
      target: '2',
      label: 'Edge Text',
      style: 'stroke-width: 4',
    }
  ]);

  const nodeTypes = {
    'command': CommandNode
  };

  const edgeTypes = {
    'socket': SocketEdge,
    'default': SocketEdge
  };
</script>
 
<!--
👇 By default, the Svelte Flow container has a height of 100%.
This means that the parent container needs a height to render the flow.
-->
<div style:height="100dvh">
  <SvelteFlow
    {nodes}
    {edges}
    {nodeTypes}
    {edgeTypes}
  >
  </SvelteFlow>
</div>
