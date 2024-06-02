import api from "../lib/axios";
import { pokemonPerPage } from "../utils/constants";

export interface Pokemon {
  name: string;
  url: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  cries: {
    latest: string;
  };
  types: Type[];
  stats: Stat[];
  height: number;
  weight: number;
}

export const getPokemons = async (page: number): Promise<PokemonDetail[]> => {
  const offset = (page - 1) * pokemonPerPage;
  try {
    const response = await api.get(
      `/pokemon?offset=${offset}&limit=${pokemonPerPage}`
    );
    const pokemons: Pokemon[] = response.data.results;

    const pokemonDetails = await Promise.all(
      pokemons.map(async (pokemon) => {
        const detailResponse = await api.get(pokemon.url);
        return detailResponse.data as PokemonDetail;
      })
    );
    return pokemonDetails;
  } catch (error) {
    console.error("Ups:", error);
    throw error;
  }
};

export const getPokemonById = async (id: number) => {
  try {
    const response = await api.get(`/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ups:", error);
    throw error;
  }
};
export const getDescriptionById = async (id: number) => {
  try {
    const response = await api.get(`/ability/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ups:", error);
    throw error;
  }
};

export const getEvolutionChainById = async (id: number) => {
  try {
    const response = await api.get(`/evolution-chain/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ups:", error);
    throw error;
  }
};
