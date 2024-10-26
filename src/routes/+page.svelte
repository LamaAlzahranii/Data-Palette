<script lang="ts">
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";
  import Chart from "chart.js/auto";
  import type { ChartType, ChartData } from "chart.js";

  export let data: PageData;

  let ctx: HTMLCanvasElement | undefined;
  let chart: Chart | undefined;
  let chartType: ChartType = "bar";  

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

    const chartData: ChartData = {
      labels: labelsData.map(item => item.label),
      datasets: [
        {
          label: "Custom Data",
          data: labelsData.map(item => Number(item.data)),
          borderWidth: 2,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]
        },
      ],
    };

    chart = new Chart(ctx, {
      type: chartType,
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: chartType !== "pie" 
          ? { y: { beginAtZero: true } } 
          : undefined,
      },
    });
  }
</script>

<style>
  .canvas-container {
    width: 100%;
    max-width: 700px;
    height: 400px;
  }

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
</style>

<div class="bg-[#F0ECE8]">
<header>
  <h2 class="text-2xl font-bold px-12">Data Palette</h2>
</header>
<div class="min-h-screen flex flex-col items-center md:flex-row md:justify-around">
  <!-- Left Section -->
  <section class="shadow-md border border-black rounded p-6 md:w-1/3 mb-6 md:mb-0">
    <div class="flex flex-col space-y-4">
      <div>
        <input
          type="text"
          placeholder="Label"
          bind:value={label}
          class="border border-black rounded w-full p-2 mb-4"
        />
      </div>

      <div>
        <input
          type="number"
          placeholder="Data"
          bind:value={dataInput}
          class="border border-black rounded w-full p-2 mb-4"
        />
        <button on:click={addLabelData} class="bg-[#ADE1F0] border border-black  text-black px-4 py-2 rounded w-full">Add Data</button>
      </div>
    </div>

    <div class="rounded mt-6 p-4">
      <table class="w-full">
        <thead>
          <tr>
            <th class="border border-black px-2 py-1">Label</th>
            <th class="border border-black px-2 py-1">Data</th>
          </tr>
        </thead>
        <tbody>
          {#each labelsData as item}
            <tr>
              <td class="border border-black px-2 py-1">{item.label}</td>
              <td class="border border-black px-2 py-1">{item.data}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- Right Section (Chart) -->
  <section class="shadow-md border border-black rounded p-6 md:w-1/2 flex flex-col items-center">
    <div class="w-full flex mb-4">
      <label for="view-chart" class="text-lg font-semibold pr-4">View chart:</label>
      <select bind:value={chartType} class="border text-xs border-black rounded p-2 bg-[#F0ECE8]">
        <option value="line">Line</option>
        <option value="bar">Bar</option>
        <option value="pie">Pie</option>
      </select>
    </div>

    <div class="canvas-container w-full flex justify-center">
      {#key [chartType]}
        <canvas bind:this={ctx} in:fade></canvas>
      {/key}
    </div>
    {#if ctx}
      <a href={ctx.toDataURL()} target="_blank" download="graph.png" class="mt-4 text-blue-800 underline">
        Download
      </a>
    {/if}
  </section>
</div>
</div>
