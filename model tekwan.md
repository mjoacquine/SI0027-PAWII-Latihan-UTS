Siap, Quin! Ini adalah **template kode Model (TODO A) yang paling bersih dan lengkap** yang sudah kita bedah sebelumnya.

Kamu bisa menjadikan kodingan ini sebagai **patokan utama / *cheat sheet*** saat UTS nanti karena struktur dasarnya (ada *trim*, regex unik, *array* dengan validator minimal 1, *subdocument* tanpa `_id`, *number constraints*, *referencing ObjectId*, dan *default values*) sudah mencakup seluruh pola soal Mongoose yang biasa diujikan.

---

### **Template Master Codingan Model untuk UTS**

```javascript
// TODO A: Rancang Schema & Model Entitas Utama (Ganti sesuai nama soal UTS)
const mongoose = require("mongoose");

// TODO A1: Buat schema subdocument tersemat (Embedded, tanpa _id sendiri)
const subDetailSchema = new mongoose.Schema({
  // Contoh constraint angka wajib dengan batasan min/max
  fieldAngka1: {
    type: Number,
    required: [true, "Field angka 1 wajib diisi"],
    min: [0, "Nilai minimum adalah 0"],
    max: [5000, "Nilai maksimum adalah 5000"]
  },
  // Contoh constraint dengan nilai default dan batas min
  fieldAngka2: {
    type: Number,
    default: 0,
    min: [0, "Tidak boleh negatif"]
  }
}, { _id: false }); // Wajib dipasang agar subdocument tidak punya _id sendiri

// TODO A2: Buat Schema Utama
const utamaSchema = new mongoose.Schema({
  // 1. Tipe String dengan trim (membersihkan spasi awal/akhir)
  nama: {
    type: String,
    required: [true, "Nama wajib diisi"],
    trim: true
  },
  
  // 2. Tipe String dengan format unik & Regex (contoh format: ABC-123456)
  kodeUnik: {
    type: String,
    required: [true, "Kode wajib diisi"],
    unique: true,
    match: [/^[A-Z]{3}-\d{6}$/, "Format kode harus 3 huruf kapital, strip, dan 6 digit angka"]
  },
  
  // 3. Array of String dengan validasi minimal 1 isi
  daftarItem: {
    type: [String],
    required: [true, "Daftar item wajib diisi"],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: "Minimal harus ada 1 item di dalam array"
    }
  },
  
  // 4. Menyisipkan Subdocument (Embedded Schema)
  detail: {
    type: subDetailSchema,
    required: [true, "Detail wajib diisi"]
  },
  
  // 5. Tipe Number dengan validasi tidak boleh negatif
  hargaAtauNilai: {
    type: Number,
    required: [true, "Nilai wajib diisi"],
    min: [0, "Nilai tidak boleh negatif"]
  },
  
  // 6. Referencing ke Model Lain (Relasi ObjectId)
  parentReferenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NamaModelLain", // Ganti sesuai nama model induk di soal (misal: Kantin, Dokter, Kategori, dll)
    required: [true, "Reference ID wajib diisi"]
  },
  
  // 7. Tipe Boolean dengan nilai bawaan (default)
  statusAktif: {
    type: Boolean,
    default: true
  },
  
  // 8. Tipe Date untuk pencatatan waktu otomatis
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// TODO A3: Export Model (Ganti nama string model sesuai entitas soal, misal "Menu", "Pasien", "Buku", dll)
module.exports = mongoose.model("NamaEntitas", utamaSchema);

```

---

### **Checklist Mental Saat Ujian (Supaya Gak Lupa):**

1. **`trim: true`** $\rightarrow$ Kalau soal minta spasi awal/akhir dibuang pada tipe *String*.
2. **`unique: true`** & **`match: [...]`** $\rightarrow$ Kalau soal minta kode unik dengan format pola tertentu (pakai regex).
3. **`validate` (Array length > 0)** $\rightarrow$ Kalau soal minta *Array of String* minimal 1 isi.
4. **`{ _id: false }`** $\rightarrow$ **Wajib diingat!** Kalau soal minta *subdocument* tanpa ID sendiri.
5. **`ref: "..."`** & **`ObjectId`** $\rightarrow$ Kalau soal meminta relasi / *referencing* ke tabel lain.

Simpan dan pahami pola struktur di atas baik-baik ya, Quin. Dengan bekal ini, model apa pun yang keluar saat UTS nanti pasti bisa kamu selesaikan dengan gampang! Semangat!