<script setup>
import { onMounted, ref, nextTick } from "vue";
import api from "../../api";
import ModalPrestasi from "../Komponen/ModalPrestasi.vue";
import { useRoute, useRouter } from "vue-router";
import { TabulatorFull as Tabulator } from "tabulator-tables";

import "tabulator-tables/dist/css/tabulator_midnight.min.css";
import "../../Assets/css/style_tabel.css";

const alumni = ref({});
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const successMessage = ref("");
const Prestasi = ref([]);

const tabulatorContainer = ref(null);
let tabulatorInstance = null;

const gradeLabel = {
  1: "Desa",
  2: "Kecamatan",
  3: "Kota",
  4: "Provinsi",
  5: "Nasional",
  6: "International",
};

const fetchDataPrestasi = async () => {
  let response;
  if (id) {
    response = await api.get(`/api/Prestasi/${id}`);
  } else {
    response = await api.get("/api/Prestasi");
  }
  Prestasi.value = response.data.data;

  if (Prestasi.value.length > 0) {
    alumni.value = Prestasi.value[0].alumni;
  }

  if (tabulatorInstance) {
    tabulatorInstance.setData(Prestasi.value);
  }
};

const initializeTable = () => {
  tabulatorInstance = new Tabulator(tabulatorContainer.value, {
    data: [],
    layout: "fitColumns",
    pagination: "local",
    paginationSize: 5,
    paginationSizeSelector: [5, 10, 25],
    height: "500px",
    columns: [
      { title: "No", formatter: "rownum", hozAlign: "center", width: 60 },
      { title: "Nama", field: "alumni.nama" },
      { title: "Prestasi", field: "prestasi" },
      {
        title: "Tingkatan",
        field: "grade",
        formatter: (cell) => gradeLabel[cell.getValue()] || "Tidak Diketahui",
      },
      {
        title: "Action",
        formatter: () => `
          <button class="badgeEdit-grad" data-bs-toggle="modal" data-bs-target="#modalEditPrestasi">Edit</button>
          <button class="badgeHapus-grad" data-bs-toggle="modal" data-bs-target="#modalHapusPrestasi">Hapus</button>
        `,
      },
    ],
  });
};

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/Login");
    return;
  }

  initializeTable();
  await fetchDataPrestasi();

  const msg = localStorage.getItem("successMessage");
  if (msg) {
    successMessage.value = msg;
    localStorage.removeItem("successMessage");

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  }
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
      <div ref="tabulatorContainer"></div>
    </div>
  </div>
</template>
