Berikut adalah penjelasan detail mengenai kodingan Middleware Error Handling Terpusat untuk **TODO D** yang sudah kamu buat, disusun dengan bahasa yang santai, jelas, dan ramah pemula agar kamu paham cara kerja penanganan error di balik layar.

---

## 1. Penjelasan Detail Kodingan Middleware Error Handling

File ini berfungsi sebagai **pusat penyaringan seluruh error** yang terjadi di dalam aplikasi Express kamu. Jadi, kalau ada error di controller, model, atau database, semuanya akan otomatis dilempar (*catch*) ke sini tanpa perlu bikin blok `try/catch` di setiap file.

### **Struktur Parameter Middleware**

```javascript
function errorHandler(err, req, res, next) {
  let status = 500;
  let message = 'Terjadi kesalahan pada server';

```

* **Fungsinya:** Fungsi middleware error di Express wajib memiliki **4 parameter** (`err`, `req`, `res`, `next`).
* Di awal, kita pasang nilai *default* untuk error umum yaitu status **500** (Internal Server Error) dengan pesan generik `'Terjadi kesalahan pada server'`.

---

### **Pengecekan Jenis-Jenis Error (Percabangan `if-else`)**

#### **1. Custom Error (Status dari Controller)**

```javascript
  if (err.status) {
    status = err.status;
    message = err.message;

```

* **Menjawab ketentuan:** *“err.status ada (mis. `{ status: 404, message }`) -> pakai status & message tersebut”*.
* **Fungsinya:** Menangkap error buatan kita sendiri yang sengaja dilempar di controller (contohnya: `throw { status: 404, message: "Menu tidak ditemukan" }`). Middleware akan mengambil angka status dan pesan teks yang kita buat.

#### **2. Mongoose ValidationError**

```javascript
  } else if (err.name === 'ValidationError') {
    status = 400;
    message = err.message;

```

* **Menjawab ketentuan:** *“ValidationError (Mongoose) -> 400, message dari error”*.
* **Fungsinya:** Menangkap error saat data yang dikirim user melanggar aturan schema Mongoose (misalnya field wajib diisi tapi dikosongkan, atau nilai kalori melebihi batas maksimal). Status otomatis diubah jadi **400** (*Bad Request*).

#### **3. Mongoose CastError (Format ID Salah)**

```javascript
  } else if (err.name === 'CastError') {
    status = 400;
    message = `Format ${err.path} tidak valid`;

```

* **Menjawab ketentuan:** *“CastError (format id/ObjectId salah) -> 400, 'Format <err.path> tidak valid'”*.
* **Fungsinya:** Menangkap error jika user memasukkan format ID di URL yang tidak sesuai dengan standar ObjectId MongoDB (misalnya parameter ID-nya diketik ngawur). Pesannya otomatis mendeteksi field mana yang salah via `${err.path}`.

#### **4. Duplicate Key Error (Data Kembar)**

```javascript
  } else if (err.code === 11000) {
    status = 400;
    message = 'Data dengan nilai unik tersebut sudah ada';

```

* **Menjawab ketentuan:** *“Duplicate key (err.code === 11000) -> 400, 'Data dengan nilai unik tersebut sudah ada'”*.
* **Fungsinya:** Menangkap error khusus MongoDB jika user mencoba memasukkan data dengan nilai yang sifatnya unik (seperti kode menu atau nomor identitas) tapi datanya sudah pernah terdaftar di database.

#### **5. Error Tak Terduga (Internal Server Error)**

```javascript
  } else {
    console.error('UNEXPECTED ERROR:', err);
    status = 500;
    message = 'Terjadi kesalahan pada server';
  }

```

* **Menjawab ketentuan:** *“error lain yang tidak terduga -> 500, catat ke console.error, message ke client TETAP generik, stack trace jangan dibocorkan”*.
* **Fungsinya:** Menjaga keamanan aplikasi jika terjadi error fatal di luar dugaan. Error aslinya dicetak di terminal server (`console.error`) buat bahan debugging developer, tapi pesan yang dikirim ke layar user **tetap disembunyikan** dengan pesan aman generik (`'Terjadi kesalahan pada server'`).

---

### **Mengirim Respons Error ke Client**

```javascript
  res.status(status).json({
    message: message
  });
}

module.exports = errorHandler;

```

* **Fungsinya:** Memastikan bentuk respons error yang dikirim ke aplikasi/Postman **selalu konsisten** dalam bentuk objek JSON berisikan properti `{ message: ... }` sesuai kontrak soal, lalu mengekspor fungsinya agar bisa dipasang di file `app.js` paling akhir.

---

## 2. Panduan Mengubah Kodingan Error Handling Jika Tema UTS Berubah

Kabar baiknya, bagian **Error Handling (Middleware) adalah bagian yang 100% BERSIFAT UNIVERSAL** dan **TIDAK PERLU DIUBAH SAMA SEKALI** meskipun tema UTS kamu diganti total (misalnya dari Kantin jadi Klinik, Toko, atau Perpustakaan)!

Kenapa? Karena logika error di atas (`ValidationError`, `CastError`, `err.code === 11000` untuk duplikat, dan *Custom Error* `err.status`) adalah aturan baku bawaan dari **Mongoose dan Express.js**, bukan bawaan tema aplikasinya.

### **Kesimpulan untuk Error Handling:**

* Apapun soal UTS-nya dan apapun nama entitasnya, file `errorHandler.js` ini kodingannya **tetap sama persis**.
* Kamu cukup pastikan file ini di-`require` dan didaftarkan di baris paling bawah file `app.js` setelah semua rute terdaftar.

Dengan menguasai 4 bagian utama ini (Model, Controller, Routing, dan Error Handling), kamu sudah memegang seluruh kunci utama untuk melibas soal UTS Pengembangan Aplikasi Web II dengan mulus! Semangat belajarnya, Quin, semoga hasil UTS-nya nanti memuaskan dan dapat nilai A!