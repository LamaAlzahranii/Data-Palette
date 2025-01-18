<script lang="ts">
    import { fade } from "svelte/transition";
    import Chart from "chart.js/auto";
    import type { ChartType, ChartData } from "chart.js";
    import { faEdit, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  
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
    let average = 0;
    let total = 0;
    let editIndex: number | null = null;
    let errorMessage = '';  
  
    function addOrUpdateLabelData() {
      errorMessage = '';  
      if (isNaN(Number(label)) && !isNaN(Number(dataInput))) {
        if (editIndex !== null) {
          labelsData[editIndex] = { label, data: dataInput };
          editIndex = null;
        } else {
          labelsData = [...labelsData, { label, data: dataInput }];
        }
        label = '';
        dataInput = '';
        calculateAverage();
        calculateTotal();
      } else {
        errorMessage = "Please ensure that 'Label' is a text and 'Data' is a number.";
      }
    }
  
    function editLabelData(index: number) {
      label = labelsData[index].label;
      dataInput = labelsData[index].data;
      editIndex = index;
    }
  
    function removeLabelData(index: number) {
      labelsData = labelsData.filter((_, i) => i !== index);
      calculateAverage();
      calculateTotal();
    }
  
    function calculateAverage() {
      if (labelsData.length > 0) {
        const sum = labelsData.reduce((acc, item) => acc + Number(item.data), 0);
        average = sum / labelsData.length;
      } else {
        average = 0;
      }
    }
  
    function calculateTotal() {
      total = labelsData.reduce((sum, item) => sum + Number(item.data), 0);
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
  
  <div class="bg-[#F0ECE8]">
    <div class="min-h-screen flex flex-col items-center md:flex-row md:justify-around responsive-container">
      <!-- Left Section -->
      <section class="shadow-md border border-black rounded p-6 mb-6 md:mb-0 input-section">
        <h2 class="section-title font-bold mb-4">Data Palette</h2>
  
        <div class="flex flex-col space-y-4">
          <div>
            <input
              type="text"
              placeholder="Label"
              bind:value={label}
              aria-label="Enter the label for the data"
              class="border border-black rounded w-full p-2 mb-4"
            />
          </div>
  
          <div>
            <input
              type="number"
              placeholder="Data"
              bind:value={dataInput}
              aria-label="Enter the data value"
              class="border border-black rounded w-full p-2 mb-4"
            />
            <button 
              on:click={addOrUpdateLabelData} 
              aria-label={editIndex !== null ? "Update Data" : "Add Data"}
              class="bg-[#ADE1F0] border border-black text-black px-4 py-2 rounded w-full">
              {editIndex !== null ? "Update Data" : "Add Data"}
            </button>
          </div>
          {#if errorMessage}
            <div class="error-message">{errorMessage}</div>
          {/if}
        </div>
  
        <div class="table-container rounded mt-6 p-4">
          <table class="w-full">
            <thead>
              <tr>
                <th class="border border-black px-2 py-1">Label</th>
                <th class="border border-black px-2 py-1">Data</th>
                <th class="border border-black px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each labelsData as item, index}
                <tr>
                  <td class="border border-black px-2 py-1">{item.label}</td>
                  <td class="border border-black px-2 py-1">{item.data}</td>
                  <td class="border border-black px-2 py-1 flex space-x-2">
                    <button 
                      on:click={() => editLabelData(index)} 
                      aria-label="Edit Data"
                      class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                      <FontAwesomeIcon icon={faEdit} /> 
                    </button>
                    <button 
                      on:click={() => removeLabelData(index)} 
                      aria-label="Delete Data"
                      class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                      <FontAwesomeIcon icon={faTrash} /> 
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
  
        <div class="mt-4">
          <strong>Average:</strong> {average}
        </div>
        <div class="mt-2">
          <strong>Total:</strong> {total}
        </div>
      </section>
  
      <!-- Right Section (Chart) -->
      <section class="shadow-md border border-black rounded p-6 flex flex-col items-center chart-section">
        <div class="w-full flex mb-4">
          <label for="view-chart" class="text-lg font-semibold pr-4">View chart:</label>
          <select bind:value={chartType} class="border text-xs border-black rounded p-2 bg-[#F0ECE8]" aria-label="Select chart type">
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
            <FontAwesomeIcon icon={faDownload} /> Download
          </a>
        {/if}
      </section>
    </div>
  </div>