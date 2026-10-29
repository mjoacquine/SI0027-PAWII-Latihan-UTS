// TODO A: Rancang Schema & Model Menu sesuai tabel skema pada README.md
//
// Ketentuan:
//   nama       String, wajib diisi, spasi di awal/akhir dibuang
//   kode       String, wajib, UNIK, berformat "MN-" diikuti tepat 6 digit angka
//   bahan      Array of String (EMBEDDED), minimal 1 bahan
//   gizi       Subdocument (EMBEDDED, tanpa _id sendiri):
//                kalori  Number, wajib, 0 s.d. 5000
//                protein Number, tidak boleh negatif, default 0
//   harga      Number, wajib, tidak boleh negatif
//   kantinId   ObjectId (REFERENCING ke model "Kantin"), wajib
//   tersedia   Boolean, default true
//   createdAt  Date, default waktu saat ini
//
// Petunjuk: lihat models/kantinModel.js sebagai contoh sintaks dasar,
// dan materi Pertemuan 9-10 (embedding vs referencing).

const mongoose = require("mongoose");

// TODO A1: buat schema subdocument gizi
const giziSchema = new mongoose.Schema(
  {
    kalori: {
      type: Number,
      required: [true, "Kalori wajib diisi"],
      min: [0, "Kalori minimal 0"],
      max: [5000, "Kalori maksimal 5000"]
    },
    protein: {
      type: Number,
      min: [0, "Protein tidak boleh negatif"],
      default: 0
    }
  },
  { _id: false } // Agar subdocument tidak memiliki _id sendiri
);

// TODO A2: buat menuSchema
const menuSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, "Nama menu wajib diisi"],
    trim: true // Membuang spasi di awal dan akhir string
  },
  kode: {
    type: String,
    required: [true, "Kode menu wajib diisi"],
    unique: true, // Bersifat unik
    match: [/^MN-\d{6}$/, "Format kode harus 'MN-' diikuti tepat 6 digit angka"]
  },
  bahan: {
    type: [String],
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: "Minimal harus ada 1 bahan"
    }
  },
  gizi: {
    type: giziSchema,
    required: [true, "Data gizi wajib diisi"]
  },
  harga: {
    type: Number,
    required: [true, "Harga wajib diisi"],
    min: [0, "Harga tidak boleh negatif"]
  },
  kantinId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kantin", // Referencing ke model Kantin
    required: [true, "Kantin ID wajib diisi"]
  },
  tersedia: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// TODO A3: export model dengan nama "Menu"
module.exports = mongoose.model("Menu", menuSchema);