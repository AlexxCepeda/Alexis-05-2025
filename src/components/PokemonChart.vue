<!-- src/components/PokemonStatsChart.vue -->
<template>
  <div class="mt-3 mb-0">
    <VueApexCharts
      type="bar"
      :options="chartOptions"
      :series="chartSeries"
      height="250"
    ></VueApexCharts>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
import type { Stat } from "../services/pokemonService";

const props = defineProps<{ stats: Stat[] }>();

const chartOptions = ref({
  xaxis: {
    categories: [] as string[],
  },
  title: {
    text: "Pokémon Stats",
  },
});

const chartSeries = ref([
  {
    name: "Base Stats",
    data: [] as number[],
  },
]);

onBeforeMount(() => {
  chartOptions.value.xaxis.categories = props.stats.map(
    (stat) => stat.stat.name
  );
  chartSeries.value[0].data = props.stats.map((stat) => stat.base_stat);
});
</script>
