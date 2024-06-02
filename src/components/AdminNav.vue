<template>
  <header
    class="px-10 py-5 bg-red-600 flex justify-between items-center absolute top-0 w-full z-10"
  >
    <Logo />
    <nav class="flex gap-x-4 gap-t-2 flex-wrap justify-cente text-white">
      <RouterLink
        v-for="route in routes"
        :key="route.name"
        :to="{ name: route.name }"
        class="rounded font-bold p-2 hover:text-yellow-400"
        active-class="text-yellow-400"
      >
        {{ route.text }}
      </RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import Logo from "./Logo.vue";
import { ref } from "vue";

interface Route {
  name: string;
  text: string;
}

const routes = ref<Route[]>([
  { name: "home", text: "Home" },
  { name: "team", text: "Team" },
]);
</script>
