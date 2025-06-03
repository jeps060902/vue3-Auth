<script setup>
import { ref, watch } from "vue";
import api from "../../api";

const nama = ref("");
const image = ref("");
const jurusan = ref("");
const angkatan = ref("");
const errors = ref({});

let f = new FormData();
const handleFileChange = (e) => {
  image.value = e.target.files[0];
};
const tambah = async () => {
  console.log("submit jalan");

  f.append("nama", nama.value);
  f.append("image", image.value);
  f.append("jurusan", jurusan.value);
  f.append("angkatan", angkatan.value);

  try {
    const res = await api.post("api/Alumni", f);
    console.log("response:", res.data);
    localStorage.setItem("successMessage", res.data.message);
    window.location.reload();
    alert("alumni berhasil ditambahkan");
  } catch (err) {
    if (err.response && err.response.status === 422) {
      errors.value = err.response.data.errors;
      alert("alumni gagal ditambahkan");
    }
  }
};

const props = defineProps({
  alumni: Object,
});
const id_edit = ref(null);
const nama_edit = ref("");
const jurusan_edit = ref("");
const angkatan_edit = ref("");

watch(
  () => props.alumni,

  (newVal) => {
    if (newVal && Object.keys(newVal).length > 0) {
      id_edit.value = newVal.id;
      nama_edit.value = newVal.nama;
      jurusan_edit.value = newVal.jurusan;
      angkatan_edit.value = newVal.angkatan;
    }
  }
);

const updatePost = async () => {
  f.append("id", id_edit.value);
  f.append("nama", nama_edit.value);
  f.append("jurusan", jurusan_edit.value);
  f.append("angkatan", angkatan_edit.value);
  f.append("_method", "PUT");

  try {
    const res = await api.post(`api/Alumni/${id_edit.value}`, f);
    console.log("response:", res.data);
    localStorage.setItem("successMessage", res.data.message);
    window.location.reload();
    alert("alumni berhasil diedit");
  } catch (err) {
    if (err.response && err.response.status === 422) {
      errors.value = err.response.data.errors;
      alert("alumni gagal diedit");
    }
  }
};
const hapusAlumni = async () => {
  try {
    const res = await api.delete(`api/Alumni/${id_edit.value}`);
    console.log("response:", res.data);
    localStorage.setItem("successMessage", res.data.message);
    alert("alumni berhasil dihapus");
    window.location.reload();
  } catch (err) {
    console.error("Gagal menghapus:", err);
    alert("Gagal menghapus");
  }
};
const nama_prestasi = ref("");
const grade = ref("");
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
const status = ref("");
const tempat = ref("");
const posisi = ref("");
const tahun_mulai = ref("");
const tahun_selesai = ref("");
const tambahKarir = async () => {
  f.append("alumni_id", id_edit.value);
  f.append("status", status.value);
  f.append("posisi", posisi.value);
  f.append("tempat", tempat.value);
  f.append("tahun_mulai", tahun_mulai.value);
  f.append("tahun_selesai", tahun_selesai.value);

  try {
    const res = await api.post(`api/Karir`, f);
    console.log("response:", res.data);
    localStorage.setItem("successMessage", res.data.message);
    window.location.reload();
    alert("karir berhasil Ditambahkan");
  } catch (err) {
    if (err.response && err.response.status === 422) {
      errors.value = err.response.data.errors;
      alert("karir gagal ditambahkan");
    }
  }
};
</script>
<template>
  <!-- tambah -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <form @submit.prevent="tambah">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah Alumni</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <label>Nama</label>
            <input
              class="form-control mb-1"
              type="text"
              name="nama"
              v-model="nama"
              id="edit-nama"
            />
            <label>Jurusan</label>
            <select name="jurusan" v-model="jurusan" class="form-select mb-2">
              <option value="" selected disabled>--Pilih Jurusan--</option>
              <option value="PPLG">PPLG</option>
              <option value="Akuntansi">Akuntansi</option>
              <option value="Perhotelan">Perhotelan</option>
            </select>
            <label>Angkatan</label>
            <select
              name="angkatan"
              v-model="angkatan"
              id="edit-angkatan"
              class="form-select"
            >
              <option value="" selected disabled>--Pilih Tahun--</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
            <label>Photo</label>
            <div class="input-group mb-3">
              <input type="file" class="form-control" id="inputGroupFile02" />
              <label class="input-group-text" for="inputGroupFile02"
                >Upload</label
              >
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- Update -->
  <div class="modal fade" id="modalEditAlumni" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <form @submit.prevent="updatePost">
        <input type="hidden" v-model="id_edit" />
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Alumni</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <label>Nama</label>
            <input type="text" v-model="nama_edit" class="form-control mb-2" />
            <label>Jurusan</label>
            <select v-model="jurusan_edit" class="form-select mb-2">
              <option value="" selected disabled>--Pilih Jurusan--</option>
              <option value="PPLG">PPLG</option>
              <option value="Akuntansi">Akuntansi</option>
              <option value="Perhotelan">Perhotelan</option>
            </select>
            <label>Angkatan</label>
            <select v-model="angkatan_edit" class="form-select">
              <option selected>--Pilih Tahun--</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- hapus -->
  <div
    class="modal fade"
    id="modalHapusAlumni"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form @submit.prevent="hapusAlumni">
        <input type="" name="id" v-model="id_edit" />
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
  <!-- Tambah Prestasi -->
  <div
    class="modal fade"
    id="modalTambahPrestasi"
    tabindex="-1"
    aria-labelledby="modalTambahPrestasiLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form @submit.prevent="tambahPrestasi" method="POST">
        <input
          type="hidden"
          name="alumni_id"
          v-model="id_edit"
          id="inputAlumniId"
        />
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
  <!-- Tambah Karir -->
  <div
    class="modal fade"
    id="modalTambahKarir"
    tabindex="-1"
    aria-labelledby="modalTambahKarirLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form @submit.prevent="tambahKarir">
        <input
          type="hidden"
          name="alumni_id"
          v-model="id_edit"
          id="inputAlumniId"
        />
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTambahPrestasiLabel">
              Tambah Karir
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
              <label>status</label>
              <select v-model="status" class="form-select">
                <option value="" selected disabled>--Pilih Status--</option>
                <option value="1">Kuliah</option>
                <option value="2">Kerja</option>
              </select>
            </div>
            <div class="mb-2">
              <label>tempat</label>
              <input
                type="text"
                v-model="tempat"
                class="form-control"
                required
              />
            </div>
            <div class="mb-2">
              <label>Posisi</label>
              <input
                type="text"
                v-model="posisi"
                class="form-control"
                placeholder="jika kuliah : mahasiswa, jika bekerja misalnya : karyawan"
                required
              />
            </div>
            <div class="mb-2">
              <label>Tahun Mulai</label>
              <select v-model="tahun_mulai" class="form-select">
                <option selected>--Pilih Tahun Mulai--</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <div class="mb-2">
              <label>Tahun Selesai</label>
              <select v-model="tahun_selesai" class="form-select">
                <option selected>--Pilih Tahun Selesai--</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
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
            <button type="submit" class="btn btn-primary">Simpan Karir</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
