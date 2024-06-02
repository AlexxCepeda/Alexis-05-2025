<template>
  <div>
    <div v-if="!!teamStore.team.length">
      <h2 class="font-black text-xl md:text-3xl mb-4">Your team</h2>
      <div
        class="grid xs:max-sm:grid-cols-1 sm:max-md:grid-cols-2 md:max-lg:grid-cols-2 lg:max-xl:grid-cols-3 xl:grid-cols-3 gap-4"
      >
        <TeamCard
          v-for="pokemon in teamStore.team"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </div>
    </div>
    <div v-else>
      <h2 class="font-black text-xl md:text-3xl text-center">
        No team members 😕
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTeamStore } from "../stores/teamStore";
import TeamCard from "../components/TeamCard.vue";

const teamStore = useTeamStore();
</script>
