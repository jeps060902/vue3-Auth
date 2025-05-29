<template>
  <div>
    <Navbar />
    <div class="container mt-2">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from "../komponen/Navbar.vue";
</script>
