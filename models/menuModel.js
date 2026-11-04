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

const mongoose = require("mongoose");

// TODO A1: buat schema subdocument gizi
const giziSchema = new mongoose.Schema({
  kalori: {
    type: Number,
    required: [true, "Kalori wajib diisi"],
    min: [0, "Kalori minimum adalah 0"],
    max: [5000, "Kalori maksimum adalah 5000"]
  },
  protein: {
    type: Number,
    default: 0,
    min: [0, "Protein tidak boleh negatif"]
  }
}, { _id: false });

// TODO A2: buat menuSchema
const menuSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, "Nama menu wajib diisi"],
    trim: true
  },
  kode: {
    type: String,
    required: [true, "Kode wajib diisi"],
    unique: true,
    match: [/^MN-\d{6}$/, "Format kode harus 'MN-' diikuti tepat 6 digit angka"]
  },
  bahan: {
    type: [String],
    required: [true, "Bahan wajib diisi"],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: "Minimal harus ada 1 bahan"
    }
  },
  gizi: {
    type: giziSchema,
    required: [true, "Informasi gizi wajib diisi"]
  },
  harga: {
    type: Number,
    required: [true, "Harga menu wajib diisi"],
    min: [0, "Harga tidak boleh negatif"]
  },
  kantinId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kantin",
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