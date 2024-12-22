var express = require("express");
var router = express.Router();
const Model_Users = require("../models/Model_Users.js");
const Model_Pelanggan = require("../models/Model_Pelanggan.js");


router.get("/", async function (req, res, next) {
  try {
    let id = req.session.userId;
    let Data = await Model_Users.getId(id);
    if (Data.length > 0) {
      let rows = await Model_Pelanggan.getAll();
      res.render("pelanggan/pelanggan", {
        data: rows,
        email: Data[0].email
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.redirect("/login");
  }
});

router.get("/detail/:kode", async function (req, res, next) {
  try {
    let kode = req.params.kode;
    let rows = await Model_Pelanggan.getId(kode);
    let Data = await Model_Users.getAll();

    if (rows.length > 0) {
      res.render("pelanggan/detail", {
        kode: rows[0].kode_pelanggan,
        id_pel: rows[0].id_pel,
        email: Data[0].email,
        nama: rows[0].nama,
        alamat: rows[0].alamat,
        no_kunci: rows[0].no_kunci,
        tarif: rows[0].tarif,
        daya: rows[0].daya,
        fakm: rows[0].fakm,
        merk_meter: rows[0].merk_meter,
        tipe_meter: rows[0].tipe_meter,
        no_meter: rows[0].no_meter,
      });
    } else {
      res.status(404).send('Data Survei Tidak Ditemukan!');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Route untuk masuk ke view tambah data pelanggan
router.get("/create", async function (req, res, next) {
  try {
    let pelanggan = await Model_Pelanggan.getAll();
    res.render("pelanggan/create", {
      jenis_pelanggan: "",
      id_pel: "", 
      nama: "", 
      alamat: "", 
      no_kunci: "", 
      tarif: "", 
      daya: "", 
      fakm: "", 
      merk_meter: "", 
      tipe_meter: "", 
      no_meter: ""
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Route untuk menambah data pelanggan
router.post('/store', async function (req, res, next) {
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
        await Model_Pelanggan.Store(Data);
        req.flash("success", "Berhasil Menyimpan Data");
        res.redirect("/pelanggan");
        } catch (error) {
        console.log(error);
        req.flash("error", "Gagal menyimpan data");
        res.redirect("/pelanggan");
        }
    }
);

// Route untuk masuk ke view edit data pelanggan
router.get("/edit/:kode", async function (req, res, next) {
  try {
      let kode = req.params.kode;
      let rows = await Model_Pelanggan.getId(kode);
      let Data = await Model_Users.getAll();
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
              no_meter: rows[0].no_meter,
              email: Data[0].email
          });
      } else {
          res.status(404).send('Data not found');
      }
  } catch (error) {
      console.log(error);
      next(error);
  }
});

// Route untuk mengupdate data pelanggan
router.post('/update/(:kode)', async function (req, res, next) {
  try {
      let kode = req.params.kode;
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
        no_meter,
      };

      await Model_Pelanggan.Update(kode, Data);
      req.flash("Success", "Berhasil menyimpan data");
      res.redirect("/pelanggan");
  } catch (error) {
      console.log(error);
      req.flash("error", "Terjadi kesalahan pada fungsi");
      res.redirect("/pelanggan");
  }
});

// Route untuk menghapus data pelanggan
router.get("/delete/:id", async function (req, res) {
  let id = req.params.id;
  try {
    await Model_Pelanggan.Delete(id);
    req.flash("success", "Berhasil Menghapus Data");
    res.redirect("/pelanggan");
  } catch (error) {
    console.log(error);
    req.flash("error", "Terjadi Kesalahan Saat Menghapus Data.");
    res.redirect("/pelanggan");
  }
});

module.exports = router;