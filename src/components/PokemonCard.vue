<template>
  <div
    class="p-4 border rounded shadow flex flex-col items-center justify-center"
  >
    <img
      :src="pokemon.sprites.front_default"
      :alt="pokemon.name"
      class="w-15 h-15"
    />
    <h3 class="text-lg font-bold capitalize">{{ pokemon.name }}</h3>
    <button
      :class="[
        teamStore.isTeamMember(pokemon.id) ? 'bg-red-500' : 'bg-blue-500',
        isDisabled ? 'cursor-not-allowed opacity-50' : '',
      ]"
      class="w-full group relative inline-flex items-center justify-center text-base font-medium text-gray-900 rounded-md group mt-2"
      :disabled="isDisabled"
      @click="teamStore.handleClickSelect(pokemon)"
    >
      <span class="text-white p-2 rounded w-full font-medium">
        {{
          teamStore.isTeamMember(pokemon.id)
            ? "Remove from team"
            : "Add to team"
        }}
      </span>
      <div
        class="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all"
        v-if="isDisabled"
      >
        <div
          class="ease-in-out duration-500 -translate-y-4 pointer-events-none transition-all group-hover:translate-y-6 absolute left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-xs text-slate-300 before:-bottom-2"
        >
          <div class="rounded-sm bg-black p-2">
            <p class="whitespace-nowrap">You've maxed out your team!</p>
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { PokemonDetail } from "../services/pokemonService";
import { useTeamStore } from "../stores/teamStore";

const teamStore = useTeamStore();

const isDisabled = computed(
  () => teamStore.team.length === 6 && !teamStore.isTeamMember(props.pokemon.id)
);

const props = defineProps<{
  pokemon: PokemonDetail;
}>();
</script>
