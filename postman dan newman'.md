Berikut adalah rangkapan tahapan lengkap penggunaan Postman untuk Latihan UTS Pengembangan Aplikasi Web II (SI0027) agar kamu bisa mengingatnya dengan mudah dan siap menghadapi ujian:

1. **Jalankan Server Lokal & MongoDB:** Langkah Awal.
Buka terminal VS Code dan pastikan server Express serta database MongoDB kamu sudah aktif dan terhubung ke `http://localhost:3000`.
*Verification:* Terminal menampilkan pesan bahwa server berhasil berjalan dan terhubung ke database.


2. **Impor Collection & Environment:** Menu Import Postman.
Buka aplikasi Postman, klik tombol **Import**, lalu pilih tab **files** dan unggah dua file sekaligus: `collection.json` dan `environment.json` dari folder project kamu.
*Verification:* Nama collection (`SI0027 PAW II - Latihan UTS - Menu Kantin`) dan environment (`Latihan UTS - Local`) muncul di panel sebelah kiri Postman.


3. **Pilih Environment yang Tepat:** Pojok Kanan Atas.
Di pojok kanan atas jendela Postman, klik dropdown yang bertuliskan *No Environment* lalu ubah dan pilih **`Latihan UTS - Local`**.
*Verification:* Indikator environment aktif dan mengarah ke URL lokal `http://localhost:3000`.


4. **Jalankan Collection Runner:** Pengujian Otomatis 28 Tes.
Klik pada nama collection di sidebar kiri, lalu klik tombol **Run** untuk membuka *Collection Runner*. Di panel kanan, pastikan semua 28 request terpilih, lalu klik tombol **Run SI0027...**.
*Verification:* Jendela hasil tes menampilkan status **Passed 55/55** (atau hijau semua) tanpa ada error.

NEWMAN
pm install -g newman

newman run PAWII-Collection.json \
  -e development.postman_environment.json
