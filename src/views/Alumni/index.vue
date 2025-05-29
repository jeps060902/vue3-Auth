<script setup>
import { onMounted, ref, nextTick } from "vue";
import api from "../../api";
import { DataTable } from "simple-datatables";
import ModalAlumni from "../Komponen/ModalAlumni.vue";
import logout from "../Komponen/logout.vue";
import "simple-datatables/dist/style.css";
import { useRouter } from "vue-router";
const loading = ref(false);
const router = useRouter();

const Alumni = ref([]);
const currentAlumni = ref({});
const successMessage = ref("");
const fetchDataAlumni = async () => {
  const response = await api.get("/api/Alumni");
  Alumni.value = response.data.data;
};
const handleAlumni = async (id) => {
  try {
    const response = await api.get(`/api/Alumni/${id}`);
    currentAlumni.value = response.data.data;
    console.log(currentAlumni.value);
  } catch (error) {
    console.error("Gagal fetch data:", error);
  }
};
onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/Login"); // arahkan ke halaman login
    return; // hentikan eksekusi jika belum login
  }
  await fetchDataAlumni();
  // Delay agar DOM selesai render
  const msg = localStorage.getItem("successMessage");
  if (msg) {
    successMessage.value = msg;
    localStorage.removeItem("successMessage");

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  }
  nextTick(() => {
    new DataTable("#alumniTable");
  });
});
const karirLabel = {
  1: "Kuliah",
  2: "Kerja",
};
</script>

<template>
  <div>
    <div v-if="loading" class="loading-overlay">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <h3 class="mb-3">Data Alumni</h3>
    <ModalAlumni :alumni="currentAlumni" />
    <logout v-model:loading="loading"></logout>
    <button
      type="button"
      class="mb-3 btn-grad"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Tambahkan Data
    </button>

    <div class="container">
      <div v-if="successMessage" class="alert alert-success mt-3">
        {{ successMessage }}
      </div>
      <div class="col-md-12">
        <div class="table-responsive">
          <table id="alumniTable" class="table table-striped table-dark">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Tahun</th>
                <th>Jurusan</th>
                <th>Prestasi</th>
                <th>Karir</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in Alumni" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.angkatan }}</td>
                <td>{{ item.jurusan }}</td>
                <td>
                  <a
                    v-if="item.prestasi && item.prestasi.length >= 1"
                    :href="`/prestasi/${item.id}`"
                  >
                    lihat prestasi
                  </a>
                  <button
                    v-else
                    type="button"
                    class="badgeTambah-grad"
                    data-bs-toggle="modal"
                    data-bs-target="#modalTambahPrestasi"
                    @click="handleAlumni(item.id)"
                  >
                    tambah
                  </button>
                </td>
                <td>
                  <a
                    v-if="item.karir && item.karir.length >= 1"
                    :href="`/karir/${item.id}`"
                  >
                    lihat karir
                  </a>
                  <button
                    v-else
                    type="button"
                    class="badgeTambah-grad"
                    data-bs-toggle="modal"
                    data-bs-target="#modalTambahKarir"
                    @click="handleAlumni(item.id)"
                  >
                    tambah
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="badgeEdit-grad"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEditAlumni"
                    @click="handleAlumni(item.id)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="badgeHapus-grad"
                    data-bs-toggle="modal"
                    data-bs-target="#modalHapusAlumni"
                    @click="handleAlumni(item.id)"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
