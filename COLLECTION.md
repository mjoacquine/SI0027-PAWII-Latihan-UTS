Berikut adalah penjelasan detail mengenai kodingan Controller untuk TODO B yang sudah kamu buat, disusun dengan bahasa yang santai, ramah pemula, dan sangat mudah dipahami baris per barisnya.

1. Penjelasan Detail Kodingan Controller (Per Bagian TODO)
TODO B1: getAll — Menampilkan Semua Data dengan Filter, Sort, Pagination, & Projection
JavaScript
exports.getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 10, MAX_LIMIT);
  const skip = (page - 1) * limit;

  // Filter berdasarkan kantinId jika ada di query string
  const filter = {};
  if (req.query.kantinId) {
    filter.kantinId = req.query.kantinId;
  }

  // Query dasar dengan populate kantinId
  let query = Menu.find(filter).populate("kantinId");

  // Sorting (default: createdAt jika query.sort tidak ada)
  if (req.query.sort) {
    query = query.sort(req.query.sort);
  } else {
    query = query.sort("createdAt");
  }

  // Field Projection (misal: fields=nama,kode)
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  }

  // Pagination skip & limit
  query = query.skip(skip).limit(limit);

  // Jalankan query data dan hitung total dokumen secara paralel
  const [data, total] = await Promise.all([
    query,
    Menu.countDocuments(filter)
  ]);

  // Kirim respons sesuai format yang diminta soal
  res.json({
    data,
    page,
    limit,
    total
  });
};
Fungsinya: Menangani endpoint GET /menu untuk mengambil daftar menu dengan fitur pencarian tingkat lanjut (filter, sorting, pembagian halaman, dan pemilihan kolom tertentu).

Penjelasan per bagian:

page & limit: Mengatur halaman aktif (default halaman 1) dan jumlah data per halaman (maksimal 100 sesuai MAX_LIMIT).

skip: Menghitung data mana saja yang harus dilewati (skip) berdasarkan halaman saat ini.

filter: Mengecek apakah ada parameter ?kantinId=... di URL. Jika ada, data disaring khusus untuk kantin tersebut.

.populate("kantinId"): Mengambil relasi data Kantin secara utuh (bukan cuma ID-nya saja).

sort: Mengurutkan data (jika tidak diisi, otomatis diurutkan berdasarkan tanggal dibuat terlama/terbaru createdAt).

fields: Memilih kolom tertentu saja yang ingin ditampilkan (misal ?fields=nama,harga), dipisah dengan koma lalu diubah formatnya untuk Mongoose.

Promise.all: Menjalankan pencarian data (query) dan penghitungan total data asli (countDocuments) secara bersamaan agar prosesnya lebih cepat.

TODO B2: getById — Menampilkan Detail Menu Berdasarkan ID
JavaScript
exports.getById = async (req, res) => {
  const data = await Menu.findById(req.params.id).populate("kantinId");
  if (!data) throw { status: 404, message: "Menu tidak ditemukan" };
  res.json(data);
};
Fungsinya: Menangani endpoint GET /menu/:id untuk mencari satu data spesifik berdasarkan ID-nya.

Penjelasan per baris:

Menu.findById(...): Mencari data di database berdasarkan ID unik dari URL.

Pemeriksaan Error (!data): Jika ID yang dimasukkan tidak ada di database, langsung melemparkan lemparan objek error status 404 (pesan: "Menu tidak ditemukan"), yang nantinya otomatis ditangkap oleh error handler tanpa perlu try/catch.

TODO B3: create — Menambah Menu Baru
JavaScript
exports.create = async (req, res) => {
  const { kode } = req.body;
  if (kode) {
    const existing = await Menu.findOne({ kode });
    if (existing) {
      throw { status: 400, message: "Kode menu sudah terdaftar" };
    }
  }
 
  const menu = await Menu.create(req.body);
  res.status(201).json(menu);
};
Fungsinya: Menangani endpoint POST /menu untuk memasukkan data menu baru ke database.

Penjelasan per baris:

Pengecekan duplikat kode: Memeriksa apakah kode yang diinput user sudah pernah dipakai sebelumnya. Jika sudah ada, lempar error status 400 (Bad Request).

Menu.create(req.body): Menyimpan data baru ke MongoDB.

res.status(201).json(menu): Mengirim respons berhasil dengan kode status 201 (Created) beserta data yang baru dibuat.

TODO B4: update — Mengubah Data Menu Berdasarkan ID
JavaScript
exports.update = async (req, res) => {
  const data = await Menu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("kantinId");
  if (!data) throw { status: 404, message: "Menu tidak ditemukan" };
  res.json(data);
};
Fungsinya: Menangani endpoint PUT /menu/:id untuk memperbarui data menu yang sudah ada.

Penjelasan per baris:

findByIdAndUpdate: Mencari data berdasarkan ID lalu menimpanya dengan data baru dari req.body.

new: true: Memastikan data yang dikembalikan ke user adalah data yang sudah diperbarui (bukan data lama).

runValidators: true: Memastikan aturan schema (seperti min, required, dll.) tetap divalidasi ulang saat proses update.

Pemeriksaan Error (!data): Jika ID yang ingin di-update tidak ditemukan, lempar error 404.

TODO B5: remove — Menghapus Menu Berdasarkan ID
JavaScript
exports.remove = async (req, res) => {
  const data = await Menu.findByIdAndDelete(req.params.id);
  if (!data) throw { status: 404, message: "Menu tidak ditemukan" };
  res.status(204).send();
};
Fungsinya: Menangani endpoint DELETE /menu/:id untuk menghapus data menu.

Penjelasan per baris:

findByIdAndDelete: Mencari data berdasarkan ID lalu menghapusnya dari database.

Pemeriksaan Error (!data): Jika ID tidak ada, lemparkan error 404.

res.status(204).send(): Mengirim respons berhasil dengan kode status 204 (No Content — sukses menghapus tanpa mengirim isi body data kembali, sesuai ketentuan soal).

Siap, Quin! Maaf ya tadi kebetulan pakai contoh perpus. Kalau tema UTS kamu yang asli ternyata **bukan perpus**, tenang saja, kita sesuaikan ke tema lain yang mirip-mirip kasus operasional atau layanan (misalnya tema **Klinik / Dokter** atau **Toko / Produk** yang sering keluar di kampus).

Kita pakai contoh tema **Klinik (Entitas: Pasien atau Layanan Dokter)** sebagai simulasi latihan pengganti. Perhatikan baik-baik bagian mana saja yang harus diubah dari kodingan model dan controller aslinya!

---

### Contoh Kasus Ganti Tema: "Klinik / Pendaftaran Pasien"

Misalkan di soal UTS nanti entitas utamanya diganti jadi **Pasien** yang berelasi ke **Dokter**, atau **Menu Kantin** diubah jadi **Layanan / Obat**. Inilah rincian apa saja yang wajib kamu ubah:

#### 1. Apa yang Harus Diubah di Bagian Model?

* **Nama Model & File**: Ganti dari `Menu` / `menuModel.js` menjadi `Pasien` / `pasienModel.js`.
* **Field Utama & Validasi**: Sesuaikan nama atributnya dengan tabel soal (misal: ganti `nama` jadi `namaLengkap`, ganti `kode` jadi `noRm` (Nomor Rekam Medis) dengan regex tertentu, ganti `bahan` jadi `gejala` (Array of String), ganti subdocument `gizi` jadi subdocument `tandaVital` (tekanan darah, suhu tubuh, dll.), dan ganti `kantinId` menjadi `dokterId` yang meref-kan model `"Dokter"`).

**Contoh Kodingan Model Baru (`pasienModel.js`):**

```javascript
const mongoose = require("mongoose");

// 1. Subdocument embedded (misal: Tanda Vital pasien, tanpa _id)
const tandaVitalSchema = new mongoose.Schema({
  suhuTubuh: { type: Number, required: true, min: 30, max: 45 },
  tekananDarah: { type: String, required: true }
}, { _id: false });

const pasienSchema = new mongoose.Schema({
  namaLengkap: { type: String, required: true, trim: true }, // Ganti nama field
  noRm: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^RM-\d{5}$/, "Format No RM harus 'RM-' dan 5 digit angka"] // Sesuaikan regex soal
  },
  gejala: { type: [String], required: true }, // Array of String
  tandaVital: tandaVitalSchema, // Subdocument embedded
  biayaKonsultasi: { type: Number, required: true, min: 0 }, // Ganti harga
  dokterId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Dokter", // Referencing diganti ke model Dokter
    required: true 
  },
  rawatInap: { type: Boolean, default: false }, // Ganti tersedia
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Pasien", pasienSchema); // Model diekspor jadi "Pasien"

```

---

#### 2. Apa yang Harus Diubah di Bagian Controller?

Strukturnya **95% sama persis**, kamu tinggal mengganti pemanggilan model dan nama parameternya saja:

1. Ganti require model menjadi: `const Pasien = require("../models/pasienModel");`
2. Di fungsi `getAll`, ganti filter `kantinId` menjadi `dokterId`.
3. Di fungsi `create`, ganti pengecekan duplikat `kode` menjadi `noRm`.
4. Ganti semua kata `Menu` di dalam controller menjadi `Pasien`.

**Contoh Kodingan Controller Baru (`pasienController.js`):**

```javascript
const Pasien = require("../models/pasienModel"); // 1. Ganti require model
const MAX_LIMIT = 100;

exports.getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 10, MAX_LIMIT);
  const skip = (page - 1) * limit;

  // 2. Filter diganti ke dokterId
  const filter = {};
  if (req.query.dokterId) {
    filter.dokterId = req.query.dokterId;
  }

  let query = Pasien.find(filter).populate("dokterId"); // Populate ke dokterId

  if (req.query.sort) {
    query = query.sort(req.query.sort);
  } else {
    query = query.sort("createdAt");
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  }

  query = query.skip(skip).limit(limit);

  const [data, total] = await Promise.all([
    query,
    Pasien.countDocuments(filter) // Ganti jadi Pasien.countDocuments
  ]);

  res.json({ data, page, limit, total });
};

exports.getById = async (req, res) => {
  const data = await Pasien.findById(req.params.id).populate("dokterId");
  if (!data) throw { status: 404, message: "Data pasien tidak ditemukan" }; // Pesan error disesuaikan
  res.json(data);
};

exports.create = async (req, res) => {
  const { noRm } = req.body; // Cek unik berdasarkan field unik di soal (misal noRm)
  if (noRm) {
    const existing = await Pasien.findOne({ noRm });
    if (existing) {
      throw { status: 400, message: "Nomor RM sudah terdaftar" };
    }
  }
  
  const pasien = await Pasien.create(req.body);
  res.status(201).json(pasien);
};

exports.update = async (req, res) => {
  const data = await Pasien.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("dokterId");
  if (!data) throw { status: 404, message: "Data pasien tidak ditemukan" };
  res.json(data);
};

exports.remove = async (req, res) => {
  const data = await Pasien.findByIdAndDelete(req.params.id);
  if (!data) throw { status: 404, message: "Data pasien tidak ditemukan" };
  res.status(204).send();
};

```

---

### Intinya yang Wajib Diingat untuk Hari-H UTS:

1. **Model**: Perhatikan apakah ada aturan unik (`unique`), format regex (*match* kode), subdokumen bertingkat (*embedded* tanpa `_id`), dan relasi (*referencing ObjectId*).
2. **Controller (`getAll`)**: Pastikan logika filter query (`req.query...`), sorting, projection, pagination (`skip`, `limit`, `MAX_LIMIT`), serta `Promise.all` dengan `countDocuments` tidak tertukar urutannya.
3. **Error Handling**: Jangan lupa lempar objek `{ status: 400 / 404, message: "..." }` jika kondisi tidak terpenuhi, karena pakai `express-async-errors` jadi aman tanpa blok `try/catch`.

Semoga latihan ini bikin kamu makin mantap dan tenang menghadapi UTS-nya, Quin! Ada lagi bagian kodingan yang mau dibahas sebelum ujian?s