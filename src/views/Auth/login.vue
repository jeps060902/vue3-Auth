<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../../api";
const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await api.post("/api/login", {
      email: email.value,
      password: password.value,
    });

    const userData = response.data.data;
    const token = response.data.token;

    // Simpan token & data user ke localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    // Redirect ke dashboard atau halaman lain
    router.push("/Alumni");
  } catch (err) {
    error.value = err.response?.data?.message || "Login gagal!";
  }
};
</script>
<template>
  <div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
      <main>
        <div class="container">
          <div class="row justify-content-center" style="margin-top: 30px">
            <div class="col-lg-7">
              <div class="card shadow-lg border-0 rounded-lg mt-5">
                <img src="/img/logo yadika.png" class="logo" />
                <div class="card-header">
                  <h3 class="text-center font-weight-light my-4 mt-5">Login</h3>
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
                        <button type="submit" class="tombol" value="login">
                          Login
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
    </div>
  </div>
</template>
