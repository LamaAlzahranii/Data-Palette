<script lang="ts">
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types"; 
  import Chart from "chart.js/auto";

  export let data: PageData;

  let ctx: HTMLCanvasElement | undefined;
  let chart: Chart | undefined;

  let showAge = true;
  let showWeight = true;
  let showHeight = true;
  let chartType: "line" | "bar" = "line";

  type LabelData = {
    label: string;
    data: string;
  };

  let label = '';
  let dataInput = ''; 
  let labelsData: LabelData[] = []; 

  function addLabelData() {
    if (isNaN(Number(label)) && !isNaN(Number(dataInput))) {
      labelsData = [...labelsData, { label, data: dataInput }];
      label = '';
      dataInput = '';
    } else {
      alert("Please ensure that 'Label' is a text and 'Data' is a number.");
    }
  }

  $: if (ctx) {
    if (chart) {
      chart.destroy();
    }

    const chartData = labelsData.map(item => Number(item.data));

    chart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: labelsData.map(item => item.label),
        datasets: [
          {
            label: "User's Age",
            data: data.users.map(({ age }) => age),
            borderWidth: 2,
            hidden: !showAge,
          },
          {
            label: "User's Height",
            data: data.users.map(({ height }) => height),
            borderWidth: 2,
            hidden: !showHeight,
          },
          {
            label: "User's Weight",
            data: data.users.map(({ weight }) => weight),
            borderWidth: 2,
            hidden: !showWeight,
            indexAxis: "x",
          },
          {
            label: "Custom Data",
            data: chartData,
            borderWidth: 2,
            hidden: false,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
        ],
      },
      options: {
        animation: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
</script>

<div class="min-h-screen bg-gray-100 p-6 flex flex-col items-center md:flex-row md:justify-around">
  <!-- Left Section -->
  <section class="bg-white shadow-md border border-gray-300 p-6 md:w-1/3 mb-6 md:mb-0">
    <h2 class="text-2xl font-bold mb-4">Data Palette</h2>

    <!-- Input for Label and Data -->
    <div class="flex flex-col space-y-4">
      <div>
        <input
          type="text"
          placeholder="Label"
          bind:value={label}
          class="border border-gray-300 rounded w-full p-2 mb-4"
        />
      </div>

      <div>
        <input
          type="number"
          placeholder="Data"
          bind:value={dataInput}
          class="border border-gray-300 rounded w-full p-2 mb-4"
        />
        <button on:click={addLabelData} class="bg-purple-300 text-white px-4 py-2 rounded w-full">Add Data</button>
      </div>
    </div>

    <!-- Table for Label and Data -->
    <div class="border border-gray-300 rounded mt-6 p-4">
      <table class="w-full">
        <thead>
          <tr>
            <th class="border px-2 py-1">Label</th>
            <th class="border px-2 py-1">Data</th>
          </tr>
        </thead>
        <tbody>
          {#each labelsData as item}
            <tr>
              <td class="border px-2 py-1">{item.label}</td>
              <td class="border px-2 py-1">{item.data}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- Right Section (Chart) -->
  <section class="bg-white shadow-md border border-gray-300 p-6 md:w-1/2 flex flex-col items-center">
    <div class="w-full flex justify-between mb-4">
      <label for="view-chart" class="text-lg font-semibold">View chart:</label>
      <input type="text" id="view-chart" class="border border-gray-300 rounded p-2 w-1/3" placeholder="Chart Options"/>
    </div>

    <!-- Chart Container -->
    <div class="canvas-container w-full flex justify-center">
      {#key [showAge, showHeight, showWeight, chartType]}
        <canvas bind:this={ctx} width="700" height="400" in:fade></canvas>
      {/key}
    </div>

    <!-- Chart Controls -->
    <div class="controls mt-4">
      <select bind:value={chartType} class="border rounded p-2">
        <option value="line">Line</option>
        <option value="bar">Bar</option>
      </select>

      <div class="flex flex-col mt-2">
        <label for="age" class="flex items-center">
          <input type="checkbox" bind:checked={showAge} id="age" />
          <span class="ml-2">Show Age</span>
        </label>

        <label for="height" class="flex items-center">
          <input type="checkbox" bind:checked={showHeight} id="height" />
          <span class="ml-2">Show Height</span>
        </label>

        <label for="weight" class="flex items-center">
          <input type="checkbox" bind:checked={showWeight} id="weight" />
          <span class="ml-2">Show Weight</span>
        </label>
      </div>
    </div>

    {#if ctx}
      <a href={ctx.toDataURL()} target="_blank" download="graph.png" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Download graph as PNG
      </a>
    {/if}
  </section>
</div>

<style>
  .canvas-container {
    width: 700px;
    max-width: 100%;
  }
</style>
