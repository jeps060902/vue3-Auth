<script setup>
import { onMounted, ref } from "vue";
import api from "../../api";
import ModalAlumni from "../Komponen/ModalAlumni.vue";
import logout from "../Komponen/logout.vue";
import { useRouter } from "vue-router";
import { TabulatorFull as Tabulator } from "tabulator-tables";

import "../../Assets/css/style_tabel.css";
import "tabulator-tables/dist/css/tabulator_midnight.min.css";

const tabulatorContainer = ref(null);
let tabulatorInstance = null;
const globalFilter = ref("");

const loading = ref(false);
const router = useRouter();

const Alumni = ref([]);
const currentAlumni = ref({});
const successMessage = ref("");

const fetchDataAlumni = async () => {
  const response = await api.get("/api/Alumni");
  Alumni.value = response.data.data;
  if (tabulatorInstance) {
    tabulatorInstance.setData(Alumni.value);
  }
};

const initializeTable = () => {
  tabulatorInstance = new Tabulator(tabulatorContainer.value, {
    data: [],
    layout: "fitColumns",
    pagination: "local",
    paginationSize: 5,
    paginationSizeSelector: [5, 10, 25, 50],
    height: "500px",
    columns: [
      {
        title: "Foto",
        field: "image_url",
        formatter: "image",
        formatterParams: {
          height: "50px",
          width: "50px",
        },
      },
      { title: "Nama Alumni", field: "nama", editor: "input" },
      { title: "Angkatan", field: "angkatan", editor: "input" },
      { title: "Jurusan", field: "jurusan", editor: "input" },
      {
        title: "Prestasi",
        formatter: (cell) => {
          const row = cell.getData();
          return row.prestasi && row.prestasi.length >= 1
            ? `<a href="/Prestasi/${row.id}">Lihat Prestasi</a>`
            : `<button class="badgeTambah-grad" data-id="${row.id}" data-target="modalTambahPrestasi">Tambah</button>`;
        },
        cellClick: (e, cell) => {
          const row = cell.getData();
          if (!row.prestasi || row.prestasi.length < 1) {
            handleAlumni(row.id);
            openModal("modalTambahPrestasi");
          }
        },
      },
      {
        title: "Karir",
        formatter: (cell) => {
          const row = cell.getData();
          return row.karir && row.karir.length >= 1
            ? `<a href="/karir/${row.id}">Lihat Karir</a>`
            : `<button class="badgeTambah-grad" data-id="${row.id}" data-target="modalTambahKarir">Tambah</button>`;
        },
        cellClick: (e, cell) => {
          const row = cell.getData();
          if (!row.karir || row.karir.length < 1) {
            handleAlumni(row.id);
            openModal("modalTambahKarir");
          }
        },
      },
      {
        title: "Action",
        formatter: (cell) => {
          const row = cell.getData();
          return `
            <button class="badgeEdit-grad" data-id="${row.id}" data-target="modalEditAlumni">Edit</button>
            <button class="badgeHapus-grad" data-id="${row.id}" data-target="modalHapusAlumni">Hapus</button>
          `;
        },
        cellClick: (e, cell) => {
          const target = e.target;
          const row = cell.getData();
          handleAlumni(row.id);
          const modalId = target.getAttribute("data-target");
          openModal(modalId);
        },
      },
    ],
    cellEdited: async function (cell) {
      const updatedData = cell.getRow().getData();
      console.log("Data yang diedit:", updatedData);
      const id = updatedData.id;

      try {
        await api.put(`/api/Alumni/${id}`, {
          ...updatedData,
        });

        console.log("Perubahan berhasil disimpan");

        // Ambil ulang data dari server agar sinkron
        await fetchDataAlumni();
      } catch (error) {
        console.error("Gagal menyimpan perubahan:", error);
        alert("Gagal menyimpan ke server");
      }
    },
  });
};

const applyFilter = () => {
  const keyword = globalFilter.value.toLowerCase();
  if (!keyword) {
    tabulatorInstance.clearFilter();
    return;
  }
  tabulatorInstance.setFilter([
    [
      { field: "nama", type: "like", value: keyword },
      { field: "jurusan", type: "like", value: keyword },
      { field: "angkatan", type: "like", value: keyword },
    ],
  ]);
};

const handleAlumni = async (id) => {
  try {
    const response = await api.get(`/api/Alumni/${id}`);
    currentAlumni.value = response.data.data;
  } catch (error) {
    console.error("Gagal fetch data:", error);
  }
};

const openModal = (id) => {
  const modal = new bootstrap.Modal(document.getElementById(id));
  modal.show();
};

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/Login");
    return;
  }

  initializeTable();
  await fetchDataAlumni();

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
    <h3 class="mb-3">Data Alumni</h3>
    <ModalAlumni :alumni="currentAlumni" />
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

      <div class="mb-3">
        <input
          v-model="globalFilter"
          @input="applyFilter"
          type="text"
          placeholder="Cari data alumni..."
          class="p-2 border rounded w-full max-w-md"
        />
      </div>

      <div ref="tabulatorContainer"></div>
    </div>
  </div>
</template>
