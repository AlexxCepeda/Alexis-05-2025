<template>
  <AdminNav />
  <div
    class="pt-28 md:pt-40 pb-16 sm:pt-32 px-4 sm:px-0 container mx-auto lg:min-h-screen"
  >
    <RouterView />
  </div>
</template>

<script setup>
import AdminNav from "../../components/AdminNav.vue";
import { RouterView } from "vue-router";
</script>
