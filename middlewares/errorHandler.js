// TODO D: Middleware error handling terpusat (Pertemuan 5 & 11-12)
// Didaftarkan PALING AKHIR pada app.js. Respons error SELALU berbentuk { message }.
//
// Pemetaan error -> status:
//   err.status ada (mis. { status: 404, message })  -> pakai status & message tersebut
//   ValidationError (Mongoose)                      -> 400, message dari error
//   CastError (format id/ObjectId salah)              -> 400, "Format <err.path> tidak valid"
//   Duplicate key (err.code === 11000)                -> 400, "Data dengan nilai unik tersebut sudah ada"
//   error lain yang tidak terduga                     -> 500, catat ke console.error,
//                                                       message ke client TETAP generik
//                                                       ("Terjadi kesalahan pada server"),
//                                                       stack trace jangan dibocorkan

function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let message = "Terjadi kesalahan pada server";

  // 1. Jika error memiliki status kustom (mis. throw { status: 404, message: "..." })
  if (err.status) {
    statusCode = err.status;
    message = err.message;
  } 
  // 2. Mongoose ValidationError (validasi skema gagal)
  else if (err.name === "ValidationError") {
    statusCode = 400;
    // Menggabungkan semua pesan error validasi Mongoose
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  } 
  // 3. Mongoose CastError (format ObjectId / tipe data salah, misal ID tidak valid)
  else if (err.name === "CastError") {
    statusCode = 400;
    message = `Format ${err.path} tidak valid`;
  } 
  // 4. MongoDB Duplicate Key Error (kode error 11000)
  else if (err.code === 11000) {
    statusCode = 400;
    message = "Data dengan nilai unik tersebut sudah ada";
  } 
  // 5. Error tidak terduga lainnya (server error)
  else {
    console.error("UNEXPECTED ERROR:", err);
    // message tetap menggunakan nilai default "Terjadi kesalahan pada server"
  }

  // Kirim respons error selalu berbentuk { message }
  res.status(statusCode).json({ message });
}

module.exports = errorHandler;