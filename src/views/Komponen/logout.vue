<script setup>
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
  <div>
    <button @click="handleLogout" class="btn btn-danger">Logout</button>
  </div>
</template>
