<template>
  <div class="p-4 border rounded shadow">
    <div class="flex flex-col sm:flex-row items-center">
      <img
        :src="pokemon.sprites.front_default"
        :alt="pokemon.name"
        class="w-1/2 h-1/2 md:w-24 md:h-24"
      />
      <div class="w-full bg-gray-100 rounded-md">
        <div class="flex justify-between px-4">
          <h3 class="text-lg font-bold capitalize text-center p-2">
            {{ pokemon.name }}
          </h3>
          <button @click="playSound(pokemon.cries.latest)">
            <svg
              class="h-8 w-8 text-black"
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
        <hr class="bg-red-500" style="height: 2px" />
        <div class="flex flex-col p-2">
          <h6 class="text-center font-semibold">Types:</h6>
          <div class="flex justify-evenly">
            <p
              v-for="{ type } in pokemon.types"
              :key="type.name"
              class="capitalize"
            >
              {{ type.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <PokemonChart :stats="pokemon.stats" />
    <div class="mt-0 grid grid-cols-1 md:grid-cols-2 gap-2">
      <Link :to="{ name: 'detail-pokemon', params: { id: pokemon.id } }">
        Details
      </Link>
      <button
        class="text-white p-2 w-full font-medium bg-red-500 rounded-md"
        @click="teamStore.handleClickSelect(pokemon)"
      >
        Remove from team
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PokemonDetail } from "../services/pokemonService";
import { useTeamStore } from "../stores/teamStore";
import { usePokemon } from "../composables/usePokemon";
import PokemonChart from "../components/PokemonChart.vue";
import Link from "./Link.vue";

const teamStore = useTeamStore();
const { playSound } = usePokemon();

defineProps<{
  pokemon: PokemonDetail;
}>();
</script>
