<script setup>
import { ref, watch } from "vue";
import api from "../../api";

const id_edit = ref("");
const id = ref("");
const nama_edit = ref("");
const jurusan_edit = ref("");
const angkatan_edit = ref("");
const nama_prestasi = ref("");
const grade = ref("");
const nama_prestasi_edit = ref("");
const grade_edit = ref("");
const errors = ref({});
let f = new FormData();
const props = defineProps({
  alumni: Object,
});
watch(
  () => props.alumni,

  (newVal) => {
    if (newVal && Object.keys(newVal).length > 0) {
      id_edit.value = newVal.alumni.id;
      id.value = newVal.id;
      nama_prestasi_edit.value = newVal.prestasi;
      grade_edit.value = newVal.grade;
      nama_edit.value = newVal.alumni.nama;
      jurusan_edit.value = newVal.alumni.jurusan;
      angkatan_edit.value = newVal.alumni.angkatan;
    }
  }
);
const tambahPrestasi = async () => {
  f.append("alumni_id", id_edit.value);
  f.append("nama_prestasi", nama_prestasi.value);
  f.append("grade", grade.value);

  try {
    const res = await api.post(`api/Prestasi`, f);
    console.log("response:", res.data);
    localStorage.setItem("successMessage", res.data.message);
    window.location.reload();
    alert("Prestasi berhasil Ditambahkan");
  } catch (err) {
    if (err.response && err.response.status === 422) {
      errors.value = err.response.data.errors;
      alert("Prestasi gagal ditambahkan");
    }
  }
};

const hapusPrestasi = async () => {
  try {
    const res = await api.delete(`api/Prestasi/${id.value}`);
    console.log("response:", res.data);
    localStorage.setItem("successMessage", res.data.message);
    alert("Prestasi berhasil dihapus");
    window.location.reload();
  } catch (err) {
    console.error("Gagal menghapus:", err);
    alert("Gagal menghapus");
  }
};
const edit = async () => {
  f.append("nama_prestasi", nama_prestasi_edit.value);
  f.append("grade", grade_edit.value);
  f.append("_method", "PUT");

  try {
    const res = await api.post(`api/Prestasi/${id.value}`, f);
    console.log("response:", res.data);
    localStorage.setItem("successMessage", res.data.message);
    window.location.reload();
    alert("prestasi berhasil diedit");
  } catch (err) {
    if (err.response && err.response.status === 422) {
      errors.value = err.response.data.errors;
      alert("prestasi gagal diedit");
    }
  }
};
</script>
<template>
  <!-- tambah -->
  <div
    class="modal fade"
    id="modalTambahPrestasi"
    tabindex="-1"
    aria-labelledby="modalTambahPrestasiLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form @submit.prevent="tambahPrestasi" method="POST">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTambahPrestasiLabel">
              Tambah Prestasi
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Tutup"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-2">
              <label>Nama</label>
              <input
                type="text"
                name="alumni_id"
                v-model="id_edit"
                id="inputAlumniId"
              />
              <input
                type="text"
                class="form-control"
                v-model="nama_edit"
                disabled
              />
            </div>
            <div class="mb-2">
              <label>Jurusan</label>
              <input
                type="text"
                class="form-control"
                v-model="jurusan_edit"
                id="inputJurusan"
                disabled
              />
            </div>
            <div class="mb-2">
              <label>Angkatan</label>
              <input
                type="text"
                v-model="angkatan_edit"
                class="form-control"
                id="inputAngkatan"
                disabled
              />
            </div>
            <div class="mb-2">
              <label>Nama Prestasi</label>
              <input
                type="text"
                v-model="nama_prestasi"
                class="form-control"
                required
              />
            </div>
            <div class="mb-2">
              <label>Tingkatan</label>
              <select v-model="grade" class="form-select">
                <option value="" selected disabled>--Pilih Tingkatan--</option>
                <option value="1">Desa</option>
                <option value="2">Kecataman</option>
                <option value="3">Kota</option>
                <option value="4">Provinsi</option>
                <option value="5">Nasional</option>
                <option value="6">Internasional</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Batal
            </button>
            <button type="submit" class="btn btn-primary">
              Simpan Prestasi
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- Hapus -->
  <div
    class="modal fade"
    id="modalHapusPrestasi"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form @submit.prevent="hapusPrestasi">
        <input type="" name="id" v-model="id" />
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Konfirmasi Hapus</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">Yakin ingin menghapus data ini?</div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-danger">Hapus</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- edit -->
  <div
    class="modal fade"
    id="modalEditPrestasi"
    tabindex="-1"
    aria-labelledby="modalEditPrestasiLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form @submit.prevent="edit">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalEditPrestasiLabel">
              Edit Prestasi
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Tutup"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-2">
              <label>Nama</label>
              <input
                type="text"
                name="alumni_id"
                v-model="id"
                id="inputAlumniId"
              />
              <input
                type="text"
                class="form-control"
                v-model="nama_edit"
                disabled
              />
            </div>
            <div class="mb-2">
              <label>Jurusan</label>
              <input
                type="text"
                class="form-control"
                v-model="jurusan_edit"
                id="inputJurusan"
                disabled
              />
            </div>
            <div class="mb-2">
              <label>Angkatan</label>
              <input
                type="text"
                v-model="angkatan_edit"
                class="form-control"
                id="inputAngkatan"
                disabled
              />
            </div>
            <div class="mb-2">
              <label>Nama Prestasi</label>
              <input
                type="text"
                v-model="nama_prestasi_edit"
                class="form-control"
                required
              />
            </div>
            <div class="mb-2">
              <label>Tingkatan</label>
              <select v-model="grade_edit" class="form-select">
                <option value="" selected disabled>--Pilih Tingkatan--</option>
                <option value="1">Desa</option>
                <option value="2">Kecataman</option>
                <option value="3">Kota</option>
                <option value="4">Provinsi</option>
                <option value="5">Nasional</option>
                <option value="6">Internasional</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Batal
            </button>
            <button type="submit" class="btn btn-primary">
              Simpan Prestasi
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
