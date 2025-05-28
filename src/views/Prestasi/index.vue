<script setup>
import { onMounted, ref, nextTick, watch } from "vue";
import api from "../../api";
import { DataTable } from "simple-datatables";
import ModalPrestasi from "../Komponen/ModalPrestasi.vue";
import "simple-datatables/dist/style.css";

import { useRoute } from "vue-router";
const alumni = ref({});
const route = useRoute();
const id = route.params.id;

const successMessage = ref("");

const Prestasi = ref([]);

const fetchDataPrestasi = async () => {
  let response;
  if (id) {
    response = await api.get(`/api/Prestasi/${id}`);
  } else {
    response = await api.get("/api/Prestasi");
  }
  Prestasi.value = response.data.data;
  if (response.data.data.length > 0) {
    alumni.value = response.data.data[0];
  }
};

const gradeLabel = {
  1: "Desa",
  2: "Kecamatan",
  3: "Kota",
  4: "Provinsi",
  5: "Nasional",
  6: "International",
};

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/Login"); // arahkan ke halaman login
    return; // hentikan eksekusi jika belum login
  }
  await fetchDataPrestasi();
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
    new DataTable("#prestasiTable");
  });
});
</script>

<template>
  <div>
    <ModalPrestasi :alumni="alumni" />
    <h3 class="mb-3">Data Prestasi Alumni</h3>
    <button
      v-if="id"
      type="button"
      class="mb-3 btn-grad"
      data-bs-toggle="modal"
      data-bs-target="#modalTambahPrestasi"
    >
      Tambahkan Data
    </button>

    <p v-else>
      Jika ingin menambahkan data, maka tambahkan di halaman Alumni dan lihat
      prestasi di halaman alumni
    </p>

    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
    </div>
    <div class="container">
      <div class="col-md-12">
        <div class="table-responsive">
          <table id="prestasiTable" class="table table-striped table-dark">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Tahun</th>
                <th>Jurusan</th>
                <th>Prestasi</th>
                <th>Tingkatan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in Prestasi" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.alumni.nama }}</td>
                <td>{{ item.alumni.angkatan }}</td>
                <td>{{ item.alumni.jurusan }}</td>
                <td>
                  {{ item.prestasi }}
                </td>
                <td>{{ gradeLabel[item.grade] || "Tidak Diketahui" }}</td>
                <td>
                  <button
                    type="button"
                    class="badgeEdit-grad"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEditPrestasi"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="badgeHapus-grad"
                    data-bs-toggle="modal"
                    data-bs-target="#modalHapusPrestasi"
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
