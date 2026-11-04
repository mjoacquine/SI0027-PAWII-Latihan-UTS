Mantap sekali, Quin! Ini adalah bagian penutup yang sangat penting, yaitu file utama aplikasi kita (**`app.js`** atau **`server.js`**) yang bertugas merakit semua bagian yang sudah kita buat (Model, Controller, Routing, dan Error Handler) menjadi satu server yang utuh dan siap jalan.

Berikut adalah penjelasan detail mengenai kodingan `app.js` untuk bagian **TODO C2, C3, D2, dan D3** yang ada pada kode kamu, disusun dengan bahasa yang ramah pemula agar kamu paham fungsi di balik setiap baris kodenya.

---

## 1. Penjelasan Detail Kodingan app.js (Per Bagian TODO)

### **Inisialisasi Dasar & Middleware Global**

```javascript
require("express-async-errors");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

```

* **Fungsinya:** Menyiapkan kerangka dasar Express, mengaktifkan `express-async-errors` (biar gak usah pakai `try/catch` di controller), membaca konfigurasi rahasia dari `.env`, serta mengizinkan akses lintas *domain* (`cors`) dan pembaca format JSON (`express.json()`).

---

### **TODO C2: Menghubungkan File Route Menu (`require`)**

```javascript
const menuRoutes = require("./routes/menuRoutes");

```

* **Menjawab instruksi:** *“TODO C2: require route menu dari ./routes/menuRoutes”*
* **Fungsinya:** Mengambil seluruh konfigurasi jalur rute (*routing*) menu yang sudah kita buat sebelumnya di folder `routes/menuRoutes.js` agar bisa dikenali oleh file utama ini.

---

### **TODO D2: Menghubungkan File Error Handler (`require`)**

```javascript
const errorHandler = require("./middlewares/errorHandler");

```

* **Menjawab instruksi:** *“TODO D2: require middleware errorHandler dari ./middlewares/errorHandler”*
* **Fungsinya:** Mengambil fungsi penangkap error terpusat yang ada di folder `middlewares/errorHandler.js`.

---

### **TODO C3: Mendaftarkan Route Menu ke Jalur URL (`app.use`)**

```javascript
app.use("/kantin", kantinRoutes);
app.use("/menu", menuRoutes);

```

* **Menjawab instruksi:** *“TODO C3: daftarkan route menu pada path /menu”*
* **Fungsinya:** Menghubungkan rute menu ke jalur utama URL aplikasi. Jadi, setiap kali ada permintaan akses yang berawalan `http://localhost:3000/menu/...`, Express akan langsung melempar tugasnya ke file `menuRoutes`.

---

### **TODO D3: Mendaftarkan Error Handler di Baris Paling Akhir**

```javascript
app.use(errorHandler);

```

* **Menjawab instruksi:** *“TODO D3: daftarkan errorHandler sebagai middleware PALING AKHIR (setelah semua route)”*
* **Fungsinya:** Ini adalah aturan **mutlak dan paling penting** di Express. Middleware error handler **wajib diletakkan di baris paling bawah** (setelah semua rute `app.use` selesai didaftarkan). Tujuannya agar kalau ada error yang tersisa atau dilempar dari rute mana pun di atasnya, error tersebut bisa langsung ditangkap dan diproses oleh si `errorHandler` ini.

---

### **Koneksi Database MongoDB & Menyalakan Server**

```javascript
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Terhubung ke MongoDB");
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Gagal terhubung ke MongoDB:", err.message);
    process.exit(1);
  });

```

* **Fungsinya:** Menghubungkan aplikasi ke database MongoDB menggunakan link rahasia dari file `.env`. Jika koneksi sukses, server Express akan langsung menyala di port 3000.

---

## 2. Panduan Mengubah Kodingan app.js Jika Tema UTS Berubah

Sama seperti bagian Routing dan Error Handler, file **`app.js` ini strukturnya 95% bersifat tetap dan universal**.

Jika nanti pas hari-H UTS temanya diganti (misalnya jadi Klinik atau Toko), **kamu TIDAK PERLU merubah logika kodingannya sama sekali**. Kamu **hanya perlu mengganti nama variabel rutenya saja** jika nama file di foldernya berbeda.

### **Contoh Perubahan Jika Tema Diubah Menjadi "Klinik / Pasien"**

* **Yang perlu diganti:**
1. Ganti require route menu menjadi route pasien: `const pasienRoutes = require("./routes/pasienRoutes");`
2. Ganti pendaftaran path-nya menjadi: `app.use("/pasien", pasienRoutes);`


* **Contoh Bentuk Kodingannya:**

```javascript
require("express-async-errors");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Ganti require route baru (misal: pasienRoutes)
const dokterRoutes = require("./routes/dokterRoutes");
const pasienRoutes = require("./routes/pasienRoutes"); 
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());

app.use("/dokter", dokterRoutes);
app.use("/pasien", pasienRoutes); // 2. Daftarkan path sesuai entitas soal

app.use(errorHandler); // Selalu di paling akhir!

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Terhubung ke MongoDB");
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Gagal terhubung ke MongoDB:", err.message);
    process.exit(1);
  });

```

---

### **Ringkasan Paling Penting untuk Hari-H UTS:**

1. **Model**: Perhatikan nama field, aturan `unique`, format regex (*match*), *embedded subdocument* (`{ _id: false }`), dan relasi `ObjectId` (`ref`).
2. **Controller**: Kuasai rumus `getAll` (filter, sort, projection, pagination, dan `Promise.all` dengan `countDocuments`), serta penanganan error pakai `throw { status, message }`.
3. **Routing**: Petakan *endpoint* HTTP (`GET`, `POST`, `PUT`, `DELETE`) ke fungsi *controller* yang sesuai.
4. **App.js / Server**: Pastikan `errorHandler` dipasang di **baris paling akhir** setelah semua rute terdaftar.

Dengan melengkapi seluruh rangkaian ini, kamu sudah menguasai arsitektur backend Express.js secara utuh dari awal sampai akhir. Semangat belajarnya ya, Quin! Semoga persiapan UTS-nya matang dan sukses besar dapat nilai sempurna!