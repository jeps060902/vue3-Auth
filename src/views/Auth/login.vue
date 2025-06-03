<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../../api";
const email = ref("");
const password = ref("");
const error = ref("");
const success = ref("");
const successLogout = ref("");
const router = useRouter();
const loading = ref(false);
const handleLogin = async () => {
  loading.value = true;
  try {
    const response = await api.post("/api/Login", {
      email: email.value,
      password: password.value,
    });

    if (!response.data.success) {
      error.value = response.data.message || "Login gagal!";
      return;
    }
    success.value = response.data.message;
    localStorage.setItem("successMessage", success.value);
    const userData = response.data.data;
    const token = response.data.token;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    router.push("/Alumni");
  } catch (err) {
    error.value = err.response?.data?.message || "Login gagal!";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const token = localStorage.getItem("token");
  const msg = localStorage.getItem("successLogout");
  if (msg) {
    successLogout.value = msg;
    localStorage.removeItem("successLogout"); // Hapus setelah ditampilkan
  }
  if (token) {
    router.push("/Alumni"); // arahkan ke halaman login
    alert("anda sedang login");
    return; // hentikan eksekusi jika belum login
  }
  setTimeout(() => {
    error.value = "";
    successLogout.value = "";
  }, 5000);
});
</script>
<template>
  <main>
    <div v-if="loading" class="loading-overlay">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-center" style="margin-top: 30px">
        <div class="col-lg-7">
          <div class="card shadow-lg border-0 rounded-lg mt-5">
            <img src="/img/logo yadika.png" class="logo" />
            <div class="card-header">
              <h3 class="text-center font-weight-light my-4 mt-5">Login</h3>
            </div>
            <div v-if="error" class="alert alert-danger mt-2">
              {{ error }}
            </div>
            <div v-if="successLogout" class="alert alert-success mt-3">
              {{ successLogout }}
            </div>
            <div class="card-body">
              <form class="user" @submit.prevent="handleLogin">
                <div class="form-floating mb-3">
                  <input
                    class="form-control form-control-user"
                    id="inputEmail"
                    type="email"
                    placeholder="email"
                    v-model="email"
                    value=""
                  />
                  <label for="inputEmail">Email</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    class="form-control form-control-user"
                    id="inputPassword"
                    type="password"
                    placeholder="password"
                    v-model="password"
                  />
                  <label for="password">Password</label>
                  <div class="invalid-feedback"></div>
                </div>

                <div class="mt-4 mb-0">
                  <div class="d-grid">
                    <button type="submit" class="tombol" :disabled="loading">
                      {{ loading ? "Memproses..." : "Login" }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
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
