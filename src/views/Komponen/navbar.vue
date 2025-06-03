<script setup>
const token = localStorage.getItem("token");
import { useRouter } from "vue-router";
import api from "../../api";
import { ref, watchEffect } from "vue";

const router = useRouter();
const loading = defineModel("loading");
const error = ref("");

const handleLogout = async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem("token");
    const response = await api.post(
      "/api/Logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem("successLogout", response.data.message);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/Login");
  } catch (err) {
    error.value = err.response?.data?.message || "Logout gagal!";
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#"
            >Home <span class="sr-only">(current)</span></a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item" v-if="token">
          <a class="nav-link" @click="handleLogout" href="#">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
  <div v-if="loading" class="loading-overlay">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
