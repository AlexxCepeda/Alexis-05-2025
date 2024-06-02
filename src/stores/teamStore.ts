import { defineStore } from "pinia";
import type { PokemonDetail } from "../services/pokemonService";
import { ref } from "vue";

export const useTeamStore = defineStore("team", () => {
  const team = ref<PokemonDetail[]>([]);

  const addToTeam = (pokemon: PokemonDetail) => {
    if (!team.value.some((indPokemon) => indPokemon.id === pokemon.id)) {
      team.value.push(pokemon);
    }
  };

  const removeFromTeam = (id: Number) => {
    team.value = team.value.filter((pokemon) => pokemon.id !== id);
  };

  const isTeamMember = (id: Number) => {
    return team.value.some((pokemon) => pokemon.id === id);
  };

  function handleClickSelect(pokemon: PokemonDetail) {
    if (isTeamMember(pokemon.id)) {
      removeFromTeam(pokemon.id);
    } else {
      addToTeam(pokemon);
    }
  }

  return {
    team,
    isTeamMember,
    handleClickSelect,
  };
});
