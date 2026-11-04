Berikut adalah penjelasan detail mengenai kodingan Routing untuk **TODO C** yang sudah kamu buat, disusun dengan bahasa yang sangat santai, jelas, dan ramah untuk pemula agar kamu paham fungsi di balik setiap baris kodenya.

---

## 1. Penjelasan Detail Kodingan Routing (Per Bagian TODO)

### **Inisialisasi Router Express**

```javascript
const express = require("express");
const router = express.Router();

```

* **Fungsinya:** Memanggil modul `express` dan menggunakan fitur **`express.Router()`**. Fitur ini berfungsi untuk memisahkan jalur rute (*routing*) agar file kodingan kita tetap rapi dan tidak menumpuk di file `app.js` utama.

---

### **TODO C1: Memanggil Controller (`require`)**

```javascript
const menuController = "../controllers/menuController";
``` *(Catatan: Di kodingan aslimu, baris ini menggunakan `require("../controllers/menuController")`)*
* **Fungsinya:** Menghubungkan file router ini dengan file *controller* (`menuController.js`) tempat fungsi logika CRUD (seperti `getAll`, `getById`, dll.) berada, sehingga rute bisa memanggil fungsi yang tepat saat diakses.

---

### **Daftar 5 Endpoint CRUD (Route Mapping)**
```javascript
router.get("/", menuController.getAll);
router.get("/:id", menuController.getById);
router.post("/", menuController.create);
router.put("/:id", menuController.update);
router.delete("/:id", menuController.remove);

```

* **Fungsinya:** Menghubungkan jalur URL (*endpoint*) HTTP dengan fungsi logika yang ada di controller.
* **Penjelasan per baris:**
1. **`router.get("/", menuController.getAll)`**: Jika seseorang mengakses URL utama (misal `http://localhost:3000/menu/`), sistem akan menjalankan fungsi `getAll` untuk menampilkan daftar menu lengkap dengan fitur *filter/sort/pagination*.
2. **`router.get("/:id", menuController.getById)`**: Jika diakses dengan menyertakan ID di URL (misal `http://localhost:3000/menu/12345`), sistem menjalankan fungsi `getById` untuk mencari satu data spesifik.
3. **`router.post("/", menuController.create)`**: Jika ada pengiriman data baru menggunakan method `POST`, sistem menjalankan fungsi `create` untuk menyimpan data ke database.
4. **`router.put("/:id", menuController.update)`**: Jika ada permintaan `PUT` dengan menyertakan ID, sistem menjalankan fungsi `update` untuk memperbarui data yang sudah ada.
5. **`router.delete("/:id", menuController.remove)`**: Jika ada permintaan `DELETE` dengan menyertakan ID, sistem menjalankan fungsi `remove` untuk menghapus data dari database.



---

### **Mengekspor Router**

```javascript
module.exports = router;

```

* **Fungsinya:** Mengekspor konfigurasi rute ini agar bisa dibaca dan dipasang ke aplikasi utama (*app.js*) menggunakan perintah `app.use('/menu', menuRoutes)`.

---

## 2. Panduan Mengubah Kodingan Routing Jika Tema UTS Berubah

Kabar baiknya, bagian **Routing adalah bagian yang paling gampang dan tidak pernah berubah strukturnya** meskipun tema UTS kamu diganti total (misalnya jadi klinik, perpustakaan, toko buku, dll.).

Struktur `router.get`, `router.post`, `router.put`, dan `router.delete` **selalu 100% sama persis**. Yang **hanya perlu diganti** hanyalah nama file *controller* yang dipanggil di bagian atas kodenya saja!

### **Contoh Perubahan Jika Tema Diubah Menjadi "Klinik / Pasien"**

* **Yang perlu diganti:**
1. Ubah require controller dari `menuController` menjadi `pasienController`.
2. Sesuaikan nama variabel penampungnya.


* **Contoh Bentuk Kodingannya:**

```javascript
const express = require("express");
const router = express.Router();

// 1. Ganti require controller ke file controller yang baru (misal: pasienController)
const pasienController = require("../controllers/pasienController");

// 2. Daftarkan rute menggunakan fungsi dari controller yang baru
router.get("/", pasienController.getAll);
router.get("/:id", pasienController.getById);
router.post("/", pasienController.create);
router.put("/:id", pasienController.update);
router.delete("/:id", pasienController.remove);

module.exports = router;

```

---

### **Kesimpulan Singkat untuk Routing:**

* Tidak ada rumus rumit di routing. Tugasnya cuma **mencocokkan metode HTTP** (`GET`, `POST`, `PUT`, `DELETE`) dan **URL** (`/` atau `/:id`) ke fungsi yang ada di dalam *controller*.
* Apapun temanya, kodingan file rutenya dijamin bakal berbentuk seperti ini.

Semoga penjelasan ini membuat kamu semakin siap dan percaya diri menghadapi UTS nanti ya, Quin! Kalau ada bagian lain yang masih bikin bingung, tanyakan saja ya!