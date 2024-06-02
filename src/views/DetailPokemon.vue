<template>
  <div v-if="pokemon !== null">
    <div class="flex flex-col sm:flex-row items-center md:items-start">
      <div class="w-full md:mt-8">
        <div class="flex items-center">
          <h1 class="text-xl md:text-4xl font-extrabold capitalize mr-4">
            {{ pokemon.name }}
          </h1>
          <button @click="playSound(pokemon.cries.latest)">
            <svg
              class="h-10 w-10 text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path
                d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
              />
            </svg>
          </button>
        </div>
        <hr class="bg-red-500 my-4 w-1/2 md:w-1/3" style="height: 2px" />
        <div class="flex items-center mb-4">
          <h6 class="text-center text-2xl font-semibold">Types:</h6>
          <div class="flex justify-evenly text-xl px-4">
            <p
              v-for="{ type } in pokemon.types"
              :key="type.name"
              class="capitalize mr-4"
            >
              {{ type.name }}
            </p>
          </div>
        </div>
        <div class="flex items-center mb-4">
          <h6 class="text-center text-2xl font-semibold">Height:</h6>
          <div class="flex justify-evenly px-4 text-xl">
            <p class="px-4 text-xl">{{ pokemon.height }} in</p>
          </div>
        </div>
        <div class="flex items-center mb-4">
          <h6 class="text-center text-2xl font-semibold">Weight:</h6>
          <p class="px-4 text-xl">{{ pokemon.weight }} pounds</p>
        </div>
        <div class="flex flex-col md:flex-row items-start md:items-center">
          <h6 class="text-center text-2xl font-semibold">Description:</h6>
          <p class="md:px-4 mt-2 md:mt-0 text-sm md:text-md">
            {{ description }}
          </p>
        </div>
      </div>
      <img
        :src="pokemon.sprites.front_default"
        :alt="pokemon.name"
        class="w-5/6 md:w-1/3 md:h-1/3 bg-red-300 mt-10 md:mt-0"
        style="border-radius: 50%"
      />
    </div>
    <PokemonChart :stats="pokemon.stats" class="my-4" />
    <ul>
      <li v-for="evolution in evolutionChain" :key="evolution.species.name">
        {{ evolution.species.name }}
      </li>
    </ul>
  </div>
  <div v-else class="text-2xl text-center font-black">
    <div v-if="isFetching">
      <SpinnerLoad />
    </div>
    <div v-else>Ups 😕<br />This pokemon is not part of your team...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTeamStore } from "../stores/teamStore";
import {
  getPokemonById,
  PokemonDetail,
  getDescriptionById,
  getEvolutionChainById,
} from "../services/pokemonService";
import SpinnerLoad from "../components/SpinnerLoad.vue";
import { usePokemon } from "../composables/usePokemon";
import PokemonChart from "../components/PokemonChart.vue";

const route = useRoute();
const teamStore = useTeamStore();
const { playSound } = usePokemon();

const pokemonId = ref<number | null>(null);
const isMember = ref<boolean>(false);
const pokemon = ref<PokemonDetail | null>(null);
const isFetching = ref<boolean>(true);
const description = ref<string>("");
const evolutionChain = ref<{ species: { name: string } }[]>([]);

onMounted(async () => {
  try {
    const { id } = route.params;
    pokemonId.value = Number(id);
    isMember.value = teamStore.isTeamMember(pokemonId.value);
    if (isMember.value) {
      const data = await getPokemonById(pokemonId.value);
      const dataDescription = await getDescriptionById(pokemonId.value);
      const evolutionData = await getEvolutionChainById(pokemonId.value);
      pokemon.value = data;
      description.value = dataDescription.effect_entries.filter(
        (effect) => effect.language.name === "en"
      )[0].effect;
      const { chain } = evolutionData;
      segmentEvolutionChain(chain);
    }
  } catch (error) {
    console.log("err", error);
  } finally {
    isFetching.value = false;
  }
});

const segmentEvolutionChain = (chain: any) => {
  if (!chain) return;
  evolutionChain.value.push({ species: { name: chain.species.id } });
  if (chain.evolves_to && chain.evolves_to.length > 0) {
    chain.evolves_to.forEach((evolution: any) => {
      evolutionChain.value.push({ species: { name: evolution.species.name } });
    });
  }
};
</script>
