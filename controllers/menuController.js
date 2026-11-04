// TODO B: Controller Menu - CRUD lengkap (Pertemuan 3-4, 9-12)
//
// Format error: lempar objek { status, message } (lihat middlewares/errorHandler.js),
// mis. throw { status: 404, message: "Menu tidak ditemukan" }
// express-async-errors sudah aktif di app.js, jadi tidak perlu try/catch.

const Menu = require("../models/menuModel");

const MAX_LIMIT = 100;

// GET /menu
exports.getAll = async (req, res) => {
  // TODO B1
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 10, MAX_LIMIT);
  const skip = (page - 1) * limit;

  // Filter berdasarkan kantinId jika ada di query string
  const filter = {};
  if (req.query.kantinId) {
    filter.kantinId = req.query.kantinId;
  }

  // Query dasar dengan populate kantinId
  let query = Menu.find(filter).populate("kantinId");

  // Sorting (default: createdAt jika query.sort tidak ada)
  if (req.query.sort) {
    query = query.sort(req.query.sort);
  } else {
    query = query.sort("createdAt");
  }

  // Field Projection (misal: fields=nama,kode)
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  }

  // Pagination skip & limit
  query = query.skip(skip).limit(limit);

  // Jalankan query data dan hitung total dokumen secara paralel
  const [data, total] = await Promise.all([
    query,
    Menu.countDocuments(filter)
  ]);

  // Kirim respons sesuai format yang diminta soal
  res.json({
    data,
    page,
    limit,
    total
  });
};

// GET /menu/:id
exports.getById = async (req, res) => {
  // TODO B2
  const data = await Menu.findById(req.params.id).populate("kantinId");
  if (!data) throw { status: 404, message: "Menu tidak ditemukan" };
  res.json(data);
};

// POST /menu
exports.create = async (req, res) => {
  // TODO B3
  const { kode } = req.body;
  if (kode) {
    const existing = await Menu.findOne({ kode });
    if (existing) {
      throw { status: 400, message: "Kode menu sudah terdaftar" };
    }
  }
 
  const menu = await Menu.create(req.body);
  res.status(201).json(menu);
};

// PUT /menu/:id
exports.update = async (req, res) => {
  // TODO B4
  const data = await Menu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("kantinId");
  if (!data) throw { status: 404, message: "Menu tidak ditemukan" };
  res.json(data);
};

// DELETE /menu/:id
exports.remove = async (req, res) => {
  // TODO B5
  const data = await Menu.findByIdAndDelete(req.params.id);
  if (!data) throw { status: 404, message: "Menu tidak ditemukan" };
  res.status(204).send();
};