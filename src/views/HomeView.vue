<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Pokémon 👇🏼</h2>
    <SpinnerLoad v-if="loading" class="text-center" />
    <div v-if="error" class="text-center text-red-500">
      <span v-html="error"></span>
    </div>
    <div
      v-if="pokemons && !loading"
      class="grid xs:max-sm:grid-cols-1 sm:max-md:grid-cols-2 md:max-lg:grid-cols-3 lg:max-xl:grid-cols-5 xl:grid-cols-5 gap-4"
    >
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>
    <div class="mt-4 flex justify-center items-center">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="mr-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        :class="{ 'cursor-not-allowed': currentPage === 1 }"
      >
        Previous
      </button>
      <span>Page {{ currentPage }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="ml-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        :class="{ 'cursor-not-allowed': currentPage === totalPages }"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getPokemons, PokemonDetail } from "../services/pokemonService";
import { useTeamStore } from "../stores/teamStore";
import PokemonCard from "../components/PokemonCard.vue";
import SpinnerLoad from "../components/SpinnerLoad.vue";
import { totalPages } from "../utils/constants";

const teamStore = useTeamStore();

const pokemons = ref<PokemonDetail[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

const currentPage = ref<number>(1);

const nextPage = () => {
  if (currentPage.value < totalPages) {
    currentPage.value++;
    loadPokemons();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadPokemons();
  }
};

const loadPokemons = async () => {
  loading.value = true;
  try {
    pokemons.value = await getPokemons(currentPage.value);
  } catch (err) {
    error.value = "Failed to load Pokémon data.";
  } finally {
    loading.value = false;
  }
};

onMounted(loadPokemons);
</script>
