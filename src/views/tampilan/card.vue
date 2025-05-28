<script setup>
import { onMounted, ref } from "vue";

import api from "../../api";

const Alumni = ref([]);
const fetchDataAlumni = async () => {
  const response = await api.get("/api/Alumni");
  Alumni.value = response.data.data;
};
onMounted(async () => {
  await fetchDataAlumni();
});
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div
        v-for="(item, index) in Alumni"
        :key="index"
        class="col-12 col-sm-6 col-md-5 col-lg-5 mb-4 d-flex align-items-stretch"
      >
        <div class="card w-100">
          <img src="..." style="background-color:grey; width:100%; height:180px" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ item.nama }}</h5>
            <p class="card-text">
                <span>Jurusan {{ item.jurusan }}</span>
            </br>
            <span
            v-if="item.prestasi && item.prestasi.length >= 1"
            :href="`/prestasi/${item.id}`"
            >
            Memiliki Prestasi tingkat: {{ item.prestasi }}
        </span>
        <span v-else>
            Unkown
        </span>
    </br>
              <span
                v-if="item.prestasi && item.prestasi.length >= 1"
                :href="`/prestasi/${item.id}`"
              >
                Sekarang sedang menempuh : {{ item.kerja }}
              </span>
              <span v-else>
                Unkown
              </span>
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
