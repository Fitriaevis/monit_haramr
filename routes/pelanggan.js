var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
var connection = require("../config/database.js");
const Model_Pelanggan = require("../models/Model_Pelanggan.js");


// Route untuk menampilkan semua pelanggan
router.get("/", async function (req, res, next) {
  try {
    let rows = await Model_Pelanggan.getAll(); // Mengambil semua data pelanggan
    res.render("pelanggan/pelanggan", { data: rows });
  } catch (error) {
    console.log(error);
    req.flash("error", "Terjadi kesalahan saat mengambil data pelanggan.");
    res.redirect("/pelanggan");
  }
});

// Route untuk halaman tambah pelanggan
router.get("/create", async function (req, res, next) {
  try {
    res.render("pelanggan/create", {
      id_pel: "",
      nama: "",
      alamat: "",
      no_kunci: "",
      tarif: "",
      daya: "",
      fakm: "",
      merk_meter: "",
      tipe_meter: "",
      no_meter: "",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Route untuk menyimpan data pelanggan
router.post("/store", async function (req, res, next) {
  try {
    let { id_pel, nama, alamat, no_kunci, tarif, daya, fakm, merk_meter, tipe_meter, no_meter } = req.body;
    let Data = {
      id_pel, 
      nama, 
      alamat, 
      no_kunci, 
      tarif, 
      daya, 
      fakm, 
      merk_meter, 
      tipe_meter, 
      no_meter
    };
    await Model_Pelanggan.Store(Data); // Menyimpan data pelanggan
    req.flash("success", "Berhasil Menyimpan Data");
    res.redirect("/pelanggan");
  } catch (error) {
    console.log(error);
    req.flash("error", "Gagal menyimpan data pelanggan.");
    res.redirect("/pelanggan");
  }
});

// Route untuk halaman edit pelanggan berdasarkan kode_pelanggan
router.get("/edit/:kode", async function (req, res, next) {
  try {
    let kode = req.params.kode;
    let rows = await Model_Pelanggan.getId(kode); // Mengambil data pelanggan berdasarkan kode_pelanggan
    
    if (rows.length > 0) {
      res.render("pelanggan/edit", {
        kode: rows[0].kode_pelanggan,
        id_pel: rows[0].id_pel,
        nama: rows[0].nama,
        alamat: rows[0].alamat,
        no_kunci: rows[0].no_kunci,
        tarif: rows[0].tarif,
        daya: rows[0].daya,
        fakm: rows[0].fakm,
        merk_meter: rows[0].merk_meter,
        tipe_meter: rows[0].tipe_meter,
        no_meter: rows[0].no_meter
      });
    } else {
      res.status(404).send('Data pelanggan tidak ditemukan');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Route untuk mengupdate data pelanggan
router.post('/update/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let { id_pel, nama, alamat, no_kunci, tarif, daya, fakm, merk_meter, tipe_meter, no_meter } = req.body;
    let Data = {
      id_pel, 
      nama, 
      alamat, 
      no_kunci, 
      tarif, 
      daya, 
      fakm, 
      merk_meter, 
      tipe_meter, 
      no_meter
    };

    await Model_Pelanggan.Update(id, Data); // Update data pelanggan berdasarkan ID
    req.flash("success", "Berhasil mengupdate data pelanggan");
    res.redirect("/pelanggan");
  } catch (error) {
    console.log(error);
    req.flash("error", "Terjadi kesalahan saat mengupdate data pelanggan.");
    res.redirect("/pelanggan");
  }
});

// Route untuk halaman detail pelanggan berdasarkan kode_pelanggan
router.get("/detail/:kode", async function (req, res, next) {
  try {
    let kode = req.params.kode;
    let rows = await Model_Pelanggan.getId(kode); // Mengambil data pelanggan berdasarkan kode_pelanggan
    
    if (rows.length > 0) {
      res.render("pelanggan/detail", {
        kode: rows[0].kode_pelanggan,
        id_pel: rows[0].id_pel,
        nama: rows[0].nama,
        alamat: rows[0].alamat,
        no_kunci: rows[0].no_kunci,
        tarif: rows[0].tarif,
        daya: rows[0].daya,
        fakm: rows[0].fakm,
        merk_meter: rows[0].merk_meter,
        tipe_meter: rows[0].tipe_meter,
        no_meter: rows[0].no_meter
      });
    } else {
      res.status(404).send('Data pelanggan tidak ditemukan');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Route untuk menghapus data pelanggan
router.get("/delete/:id", async function (req, res) {
  let id = req.params.id;
  try {
    await Model_Pelanggan.Delete(id); // Menghapus data pelanggan berdasarkan ID
    req.flash("success", "Berhasil menghapus data pelanggan");
    res.redirect("/pelanggan");
  } catch (error) {
    console.log(error);
    req.flash("error", "Terjadi kesalahan saat menghapus data pelanggan.");
    res.redirect("/pelanggan");
  }
});

module.exports = router;