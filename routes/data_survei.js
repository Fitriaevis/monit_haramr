var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require('multer')
var connection = require("../config/database.js");
const Model_Users = require("../models/Model_Users.js");
const Model_Pelanggan = require("../models/Model_Pelanggan.js")
const Model_Permasalahan = require("../models/Model_Permasalahan.js")
const Model_Perbaikan = require("../models/Model_Perbaikan.js")
const Model_Data_Survei = require("../models/Model_Data_Survei.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/upload");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.get("/", async function (req, res, next) {
  // // try {
  // //   let id = req.session.userId;
  // //   let Data = await Model_Users.getId(id);
  //   if (Data.length > 0) {
      let rows = await Model_Data_Survei.getAll();
      let dataPelanggan = await Model_Pelanggan.getAll(); 
      let dataPermasalahan = await Model_Permasalahan.getAll(); 
      let dataPerbaikan = await Model_Perbaikan.getAll(); 
      res.render("data_survei/data_survei", {
        data: rows,
        dataPelanggan,
        dataPermasalahan,
        dataPerbaikan
      });
  //   } else {
  //     res.redirect("/login");
  //   }
  // } catch (error) {
  //   res.redirect("/login");
  // }
});

router.get("/create", async function (req, res, next) {
  try { 
    let rows = await Model_Data_Survei.getAll();
    res.render("data_survei/create", {
      data: rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error')
  }
});


router.post("/store", upload.fields([
  { name: "foto_phasor", maxCount: 1 },
  { name: "foto_app", maxCount: 1 },
  { name: "foto_meter", maxCount: 1 },
  { name: "foto_ct", maxCount: 1 },
  { name: "foto_cb_mccb", maxCount: 1 },
  { name: "foto_ba", maxCount: 1 },
  { name: "foto_segel", maxCount: 1 }
]), async function (req, res, next) {
  try {
      let {
        id_pel, tanggal_pemeriksaan, nama, alamat, tarif, daya, fakm, merk_meter, tipe_meter, no_meter,
        maps, lwbp, wbp, bp, total, kvarh, merk_cb_mccb, merk_ct, penggantian_modem, no_meter_update, 
        merk_modem, tipe_modem, imei_modem, simcard, ip_access, shuntrip, error_kwh_persen, 
        id_permasalahan, id_perbaikan, petugas
      } = req.body;

      let Data = {
          id_pel,
          tanggal_pemeriksaan,
          nama,
          alamat,
          tarif,
          daya,
          fakm,
          merk_meter,
          tipe_meter,
          no_meter,
          maps,
          lwbp,
          wbp,
          bp,
          total,
          kvarh,
          merk_cb_mccb,
          merk_ct,
          penggantian_modem,
          no_meter_update,
          merk_modem,
          tipe_modem,
          imei_modem,
          simcard,
          ip_access,
          foto_phasor: req.files.foto_phasor ? req.files.foto_phasor[0].filename : null,
          foto_app: req.files.foto_app ? req.files.foto_app[0].filename : null,
          foto_meter: req.files.foto_meter ? req.files.foto_meter[0].filename : null,
          foto_ct: req.files.foto_ct ? req.files.foto_ct[0].filename : null,
          foto_cb_mccb: req.files.foto_cb_mccb ? req.files.foto_cb_mccb[0].filename : null,
          foto_ba: req.files.foto_ba ? req.files.foto_ba[0].filename : null,
          shuntrip,
          foto_segel: req.files.foto_segel ? req.files.foto_segel[0].filename : null,
          error_kwh_persen,
          id_permasalahan,
          id_perbaikan,
          petugas
      };

      await Model_Data_Survei.Store(Data);
      req.flash("success", "Berhasil Menyimpan Data");
      res.redirect("/data_survei");
  } catch (error) {
      console.log(error);
      req.flash("error", "Gagal menyimpan data");
      res.redirect("/data_survei");
  }
});



router.get("/edit/(:id)", async function (req, res, next) {
  try {
    let id = req.params.id;
    let dataPelanggan = await Model_Pelanggan.getAll();
    let dataPermasalahan = await Model_Permasalahan.getAll();
    let dataPerbaikan = await Model_Perbaikan.getAll();
    let rows = await Model_Data_Survei.getId(id);
    
    if (rows.length > 0) {
      res.render("kelas_pembelajaran/edit", {
        id: rows[0].id_data_survei,
        id_pel: rows[0].id_pel,
        data1: dataPelanggan,
        tanggal_pemeriksaan: rows[0].tanggal_pemeriksaan,
        nama: rows[0].nama,
        alamat: rows[0].alamat,
        tarif: rows[0].tarif,
        daya: rows[0].daya,
        fakm: rows[0].fakm,
        merk_meter: rows[0].merk_meter,
        tipe_meter: rows[0].tipe_meter,
        no_meter: rows[0].no_meter,
        maps: rows[0].maps,
        lwbp: rows[0].tanggal_pemeriksaan,
        wbp: rows[0].wbp,
        bp: rows[0].bp,
        total: rows[0].total,
        kvarh: rows[0].kvarh,
        merk_cb_mccb: rows[0].merk_cb_mccb,
        tipe_cb_mccb: rows[0].tipe_cb_mccb,
        merk_ct: rows[0].merk_ct,
        penggantian_modem: rows[0].penggantian_modem,
        no_meter_update: rows[0].no_meter_update,
        merk_modem: rows[0].merk_modem,
        tipe_modem: rows[0].tipe_modem,
        imei_modem: rows[0].imei_modem,
        simcard: rows[0].simcard,
        ip_access: rows[0].ip_access,
        foto_phasor: rows[0].foto_phasor,
        foto_app: rows[0].foto_app,
        foto_meter: rows[0].foto_meter,
        foto_ct: rows[0].foto_ct,
        foto_cb_mccb: rows[0].foto_cb_mccb,
        foto_ba: rows[0].foto_ba,
        shuntrip: rows[0].shuntrip,
        foto_segel: rows[0].foto_segel,
        error_kwh_persen: rows[0].error_kwh_persen,
        id_perbaikan: rows[0].id_perbaikan,
        data2: dataPerbaikan,
        id_permasalahan: rows[0].id_permasalahan,
        data3: dataPermasalahan,
        petugas: rows[0].petugas,
      });
    } else {
      res.status(404).send('Data not found');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/update/:id", upload.single("file_report"), async function (req, res, next) {
  try {
      let id = req.params.id;
      let filebaru = req.file ? req.file.filename : null;
      let rows = await Model_Data_Survei.getId(id);
      const namaFileLama = rows[0].file_report;
      if (filebaru && namaFileLama) {
          const pathFileLama = path.join(__dirname, "../public/images/upload", namaFileLama);
          fs.unlinkSync(pathFileLama);
      }
      let { id_pel, tanggal_pemeriksaan, nama, alamat, tarif, daya, fakm, merk_meter, tipe_meter, no_meter, maps, lwbp, wbp, bp, total,kvarh, merk_cb_mccb,
            tipe_cb_mccb, merk_ct, penggantian_modem, no_meter_update, merk_modem  } = req.body;
      let foto_phasor = filebaru || namaFileLama;
      let Data = {
        id_pel,
      tanggal_pemeriksaan,
      nama,
      alamat,
      tarif,
      daya,
      fakm,
      merk_meter,
      tipe_meter,
      no_meter,
      maps,
      lwbp,
      wbp,
      bp,
      total,
      kvarh,
      merk_cb_mccb,
      tipe_cb_mccb,
      merk_ct,
      penggantian_modem,
      no_meter_update,
      merk_modem,
      tipe_modem,
      imei_modem,
      simcard,
      ip_access,
      foto_phasor,
      foto_app,
      foto_meter,
      foto_ct,
      foto_cb_mccb,
      foto_ba,
      shuntrip,
      foto_segel,
      error_kwh_persen,
      id_perbaikan,
      id_permasalahan,
      petugas,
      };

      await Model_Kelas.Update(id, Data);
      req.flash("Success", "Berhasil menyimpan data");
      res.redirect("/kelas_pembelajaran");
  } catch (error) {
      console.log(error);
      req.flash("error", "Terjadi kesalahan pada fungsi");
      res.redirect("/kelas_pembelajaran");
  }
});



router.get("/delete/(:id)", async function (req, res) {
  let id = req.params.id;
  let rows = await Model_Data_Survei.getId(id)
  const namaFileLama = rows[0].file_report;
  if(namaFileLama){
    const pathFileLama = path.join(__dirname, '../public/images/upload', namaFileLama);
    fs.unlinkSync(pathFileLama);
  }
  await Model_Data_Survei.Delete(id);
  req.flash("Success", "berhasil menghapus data");
  res.redirect("/data_survei");
});

module.exports = router;