Berikut adalah ringkasan inti, poin-poin krusial, dan strategi persiapan untuk menghadapi dan mengerjakan soal UTS **Pengembangan Aplikasi Web II (SI0027) Universitas Multi Data Palembang**:

---

### 1. Inti Tugas yang Harus Dikerjakan

Anda diminta untuk membangun **Model Mongoose** dan **Controller/Route CRUD** lengkap untuk entitas **Menu**, dengan ketentuan utama:

* **Relasi:** Menu melakukan *referencing* ke entitas `Kantin` (`kantinId`), dan pada endpoint `GET /menu` serta `GET /menu/:id`, data kantin tersebut **wajib di-populate**.
* **Validasi Ketat:**
* Field `kode` wajib unik dan menggunakan format khusus regex: `MN-` diikuti tepat 6 digit angka (contoh: `MN-004217`).
* Field `gizi` adalah subdokumen (embedded) tanpa `_id` sendiri, dengan kalori maksimal 5000 dan protein tidak boleh negatif.


* **Fitur Query Lanjutan (`GET /menu`):** Harus mendukung **Filtering** (`kantinId`), **Sorting** (default `createdAt`), **Pagination** (`page` & `limit` max 100), dan **Projection** (`fields`).
* **Format Error Konsisten:** Semua error wajib mengembalikan format JSON `{ "message": "..." }` dengan kode status HTTP yang tepat (`400`, `404`, `500`).

---

### 2. Checklist Persiapan & Langkah Pengerjaan UTS

1. **1. Pahami Skema Mongoose (Models):** Fokus utama pada validasi.
Pastikan file model `Menu.js` Anda mendefinisikan tipe data, aturan unik, regex untuk `kode`, serta subdokumen `gizi` dengan benar agar lolos uji validasi Mongoose/Express.


2. **2. Implementasikan Controller CRUD:** Logika Bisnis & Populate.
Buat fungsi untuk `create`, `read` (dengan fitur query lengkap), `update`, dan `delete`. Jangan lupa menambahkan method `.populate('kantinId')` pada endpoint GET menu agar relasi kantin tampil sebagai objek.


3. **3. Uji Coba Alur dengan Postman / Pengujian Otomatis:** Verifikasi Status HTTP.
Pastikan respons kode status sesuai standar kontrak API: `201` untuk berhasil buat, `204` (tanpa body) untuk berhasil hapus, `400` untuk validasi/duplikat, dan `404` jika data tidak ditemukan.


---

> **Tips Penting:** Karena pengujian bersifat otomatis, perhatikan besar-kecilnya huruf (case-sensitive) pada nama field JSON, format endpoint (`/menu`), serta penanganan error terpusat agar tidak ada stack trace yang bocor ke client saat terjadi error `500`.