<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  import type { Writable } from 'svelte/store';

  import { SlideToggle } from '@skeletonlabs/skeleton';
  import { CodeBlock } from '@skeletonlabs/skeleton';
 
  type $$Props = NodeProps;
 
  export let data: { 
    label: Writable<string>,
    inputs: Writable<string[]>,
    outputs: Writable<string[]>,
    logs: Writable<string[]>,
    status: Writable<string>,
  };
 
  const { label, inputs, outputs, logs, status } = data;

  let nodeContainer: HTMLElement
  let headerContainer: HTMLElement
  let inputParameters: HTMLElement[] = []
  let outputParameters: HTMLElement[] = []

  $: headerHandleOffset = (headerContainer?.offsetHeight || 0) / 2

  $: inputParameterOffset = (index: number) => {
    if(inputParameters[index] == undefined || nodeContainer == undefined) {
      return 0
    }

    const nodeRect = nodeContainer.getBoundingClientRect()
    const inputParametersRect = inputParameters[index].getBoundingClientRect()
    return inputParametersRect.top - nodeRect.top + inputParameters[index].offsetHeight / 2
  }

  $: outputParameterOffset = (index: number) => {
    if(outputParameters[index] == undefined || nodeContainer == undefined) {
      return 0
    }

    const nodeRect = nodeContainer.getBoundingClientRect()
    const outputParametersRect = outputParameters[index].getBoundingClientRect()
    return outputParametersRect.top - nodeRect.top + outputParameters[index].offsetHeight / 2
  }

  let logsElement: HTMLElement
  let showCommmandLogs = false
  $: logsStyle = `
    height: ${showCommmandLogs ? logsElement?.scrollHeight : 0}px;
    opacity: ${showCommmandLogs ? 1 : 0};
  `
</script>
 
<div class="card overflow-hidden text-gray-600 min-w-[500px]" bind:this={nodeContainer}>
    <div class="px-4 md:px-5 py-2" bind:this={headerContainer}>
      <Handle type="target" position={Position.Left} style={`top: ${headerHandleOffset}px`} id="upstream" class="stream-handle"/>
      <h3 class="justify-center w-full font-semibold border-secondary-700 text-secondary-700 py-4 inline-flex items-center gap-x-2 border-b-2">
        <span class="material-symbols-outlined">home</span>
        <span>{$label}</span>
      </h3>
      <Handle type="source" position={Position.Right} style={`top: ${headerHandleOffset}px`} id="downstream" class="stream-handle"/>
    </div>

    <div class="flex flex-row p-4 justify-between gap-12">
      <div class="flex gap-2 flex-col flex-grow">
        {#each $inputs as input, index}
          <div class="flex justify-between" bind:this={inputParameters[index]}>
            <Handle type="target" position={Position.Left} style={`top: ${inputParameterOffset(index)}px`} id={`input-${input}`} class="parameter-handle parameter-handle-input"/>
            <label for="hs-basic-with-description" class="me-3">{input}</label>
            <SlideToggle name={`${$label}-input-${index}`} size="sm"/>
          </div>
        {/each}
      </div>

      <div class="flex gap-2 flex-col">
        {#each $outputs as output, index}
          <div class="flex justify-between" bind:this={outputParameters[index]}>
            <Handle type="source" position={Position.Right} style={`top: ${outputParameterOffset(index)}px`} id={`output-${output}`} class="parameter-handle parameter-handle-output"/>
            <label for="hs-basic-with-description" class="me-3">{output}</label>
          </div>
        {/each}
      </div>
    </div>

    <span class="flex flex-col bg-secondary-200 rounded-container-token">
      <div class="flex flex-col transition-all overflow-hidden max-h-96" bind:this={logsElement} style={logsStyle}>
        <CodeBlock code={$logs.join("\n")} class="overflow-visible bg-surface-600"></CodeBlock>
      </div>

      <div class="text-secondary-700 flex gap-2 justify-between py-4 px-4 md:px-5">
        <span class="flex items-center">{$status}</span>
        <div class="flex gap-2">
          <button class="material-symbols-outlined p-1 rounded-full hover:bg-secondary-300 ease-out transition duration-500 bg-transparent" on:click={() => showCommmandLogs = !showCommmandLogs}>
          {#if showCommmandLogs}unfold_less{:else}unfold_more{/if}
          </button>
          <button class="material-symbols-outlined p-1 rounded-full hover:bg-secondary-300 ease-out transition duration-500 bg-transparent">
          play_arrow
          </button>
        </div>
      </div>
    </span>
</div>

<style>
  :global(div.parameter-handle) {
    background: transparent;
    border-radius: 0;
    border: none;
    height: 2rem;
    width: 2rem;
  }

  :global(div.parameter-handle):hover:after {
    scale: 1.2;
    transition: 0.2s;
  }

  :global(div.parameter-handle):after {
    content: "";
    display: block;
    background: rgba(var(--color-surface-600));
    border-radius: 0;
    border: none;
    height: 1rem;
    width: 0.5rem;
    position: absolute;
    top: 50%;
    transform-origin: top;
  }

  :global(div.parameter-handle-input) {
    transform: translate(-50%, -50%);
    transform-origin: left;
  }

  :global(div.parameter-handle-input):after {
    border-radius: 1rem 0 0 1rem;
    right: 1rem;
    transform: translate(0%, -50%);
  }

  :global(div.parameter-handle-output) {
    transform: translate(50%, -50%);
    transform-origin: right;
  }

  :global(div.parameter-handle-output):after {
    border-radius: 0 1rem 1rem 0;
    left: 1rem;
    transform: translate(0%, -50%);
  }

  :global(div.stream-handle) {
    height: 1.5rem;
    width: 1.5rem;
    background: rgba(var(--color-secondary-200));
    border: 2px solid rgb(var(--color-secondary-700) / var(--tw-text-opacity))
  }
</style>
