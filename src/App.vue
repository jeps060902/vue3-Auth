<script setup>
import { useRoute } from "vue-router";
import { onMounted, onUnmounted, watch } from "vue";

const route = useRoute();

const updateBodyClass = () => {
  if (route.path === "/Login" || route.path === "/Register") {
    document.body.classList.add("background");
  } else {
    document.body.classList.remove("background");
  }
};

onMounted(() => {
  updateBodyClass();

  // Pantau perubahan route
  watch(
    () => route.path,
    () => {
      updateBodyClass();
    }
  );
});

onUnmounted(() => {
  document.body.classList.remove("background"); // Bersihkan saat komponen unmount
});
</script>

<template>
  <div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
