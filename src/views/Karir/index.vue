<script setup>
import { onMounted, ref, nextTick } from "vue";
import api from "../../api";
import { TabulatorFull as Tabulator } from "tabulator-tables"; // ✅ benar
import "../../Assets/css/style_tabel.css";
import "tabulator-tables/dist/css/tabulator_midnight.min.css";

const tabulatorContainer = ref(null);
let tabulatorInstance = null;

import { useRoute } from "vue-router";
const Karir = ref([]);
const route = useRoute();
const id = route.params.id;

const globalFilter = ref("");

const fetchDataKarir = async () => {
  const response = id
    ? await api.get(`/api/Karir/${id}`)
    : await api.get("/api/Karir");

  Karir.value = response.data.data.map((item) => ({
    ...item,
    nama_alumni: item.alumni?.nama || "Tidak diketahui",
  }));

  if (tabulatorInstance) {
    tabulatorInstance.setData(Karir.value);
  }
};

const initializeTable = () => {
  tabulatorInstance = new Tabulator(tabulatorContainer.value, {
    data: [],
    layout: "fitColumns",
    pagination: "local",
    paginationSize: 5,
    paginationSizeSelector: [5, 10, 25, 50],
    height: "400px",
    columns: [
      { title: "Nama Alumni", field: "nama_alumni", editor: "input" },
      { title: "Tempat", field: "tempat", editor: "input" },
      { title: "Posisi", field: "posisi", editor: "input" },
      { title: "Tahun Mulai", field: "tahun_mulai", editor: "input" },
      { title: "Tahun Selesai", field: "tahun_selesai", editor: "input" },
    ],
    cellEdited: async function (cell) {
      const updatedData = cell.getRow().getData();
      const id = updatedData.id;

      try {
        // Kirim sebagai POST + spoof PUT
        await api.post(`/api/Karir/${id}`, {
          ...updatedData,
          _method: "PUT",
        });

        console.log("Perubahan berhasil disimpan");
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
      { field: "nama_alumni", type: "like", value: keyword },
      { field: "tempat", type: "like", value: keyword },
      { field: "posisi", type: "like", value: keyword },
      { field: "tahun_mulai", type: "like", value: keyword },
      { field: "tahun_selesai", type: "like", value: keyword },
    ],
  ]);
};

onMounted(async () => {
  await nextTick();
  initializeTable();
  await fetchDataKarir();
});
</script>

<template>
  <h3 class="mb-3">Tabel Karir Alumni</h3>
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
</template>
