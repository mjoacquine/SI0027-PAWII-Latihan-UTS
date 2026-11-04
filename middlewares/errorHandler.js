// TODO D: Middleware error handling terpusat (Pertemuan 5 & 11-12)
function errorHandler(err, req, res, next) {
  let status = 500;
  let message = 'Terjadi kesalahan pada server';

  if (err.status) {
    // 1. Custom error dengan status code sendiri
    status = err.status;
    message = err.message;
  } else if (err.name === 'ValidationError') {
    // 2. Mongoose ValidationError
    status = 400;
    message = err.message;
  } else if (err.name === 'CastError') {
    // 3. Mongoose CastError (Format ID salah)
    status = 400;
    message = `Format ${err.path} tidak valid`;
  } else if (err.code === 11000) {
    // 4. MongoDB Duplicate Key error
    status = 400;
    message = 'Data dengan nilai unik tersebut sudah ada';
  } else {
    // 5. Error tidak terduga (Internal Server Error)
    console.error('UNEXPECTED ERROR:', err);
    status = 500;
    message = 'Terjadi kesalahan pada server';
  }

  // SESUAI KETENTUAN: Respons error SELALU berbentuk { message }
  res.status(status).json({
    message: message
  });
}

module.exports = errorHandler;