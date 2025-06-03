<script setup>
import { onMounted, ref } from "vue";
import api from "../../api";

// State utama
const Alumni = ref([]);

// Ambil data dari API
const fetchDataAlumni = async () => {
  try {
    const response = await api.get("/api/Card");
    Alumni.value = response.data.data;
  } catch (error) {
    console.error("Gagal mengambil data alumni:", error);
  }
};

// Fetch saat komponen dimount
onMounted(fetchDataAlumni);

// Label untuk prestasi dan karir
const gradeLabel = {
  1: "Desa",
  2: "Kecamatan",
  3: "Kota",
  4: "Provinsi",
  5: "Nasional",
  6: "International",
};

const karirLabel = {
  1: "Kuliah",
  2: "Kerja",
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div
        v-for="(item, index) in Alumni"
        :key="index"
        class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 d-flex align-items-stretch"
      >
        <div class="card w-100">
          <img
            :src="item.image_url"
            style="background-color: grey; width: 100%; height: 180px"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.nama }}</h5>
            <p class="card-text">
              <span>Jurusan {{ item.jurusan }}</span>
              <br />

              <span v-if="item.prestasi && item.prestasi.length > 0">
                Memiliki Prestasi tingkat:
                <ul>
                  <li v-for="(p, i) in item.prestasi" :key="i">
                    {{ p.prestasi }} (Tingkat:
                    {{ gradeLabel[p.grade] ?? "Tidak diketahui" }})
                  </li>
                </ul>
              </span>
              <span v-else>Tidak ada data prestasi</span>
              <br />

              <span v-if="item.karir && item.karir.length > 0">
                Riwayat Karir:
                <ul>
                  <li v-for="(k, i) in item.karir" :key="i">
                    {{ karirLabel[k.status] ?? "Status Tidak Diketahui" }}
                    (Sebagai: {{ k.posisi }})
                  </li>
                </ul>
              </span>
              <span v-else>Tidak ada data karir</span>
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
