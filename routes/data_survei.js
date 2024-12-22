var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require('multer');
const Model_Users = require("../models/Model_Users.js")
const Model_Pelanggan = require("../models/Model_Pelanggan.js");
const Model_Permasalahan = require("../models/Model_Permasalahan.js");
const Model_Perbaikan = require("../models/Model_Perbaikan.js");
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
  try {
    let id = req.session.userId;
    let Data = await Model_Users.getId(id);
    if (Data.length > 0) {
      let Data = await Model_Users.getAll();
      let rows = await Model_Data_Survei.getAll();
      let dataPelanggan = await Model_Pelanggan.getAll(); 
      let dataPermasalahan = await Model_Permasalahan.getAll(); 
      let dataPerbaikan = await Model_Perbaikan.getAll(); 
      res.render("data_survei/data_survei", {
        data: rows,
        dataPelanggan,
        dataPermasalahan,
        dataPerbaikan,
        email: Data[0].email
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.redirect("/login");
  }
});

router.get("/detail/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let dataPelanggan = await Model_Pelanggan.getAll();
    let dataPermasalahan = await Model_Permasalahan.getAll();
    let dataPerbaikan = await Model_Perbaikan.getAll();
    let rows = await Model_Data_Survei.getId(id);
    let Data = await Model_Users.getAll();

    if (rows.length > 0) {
      console.log(rows[0].latitude, rows[0].longitude);
      res.render("data_survei/detail", {
        id: rows[0].id_data_survei,
        email: Data[0].email,
        id_pel: rows[0].id_pel,
        dataPelanggan: dataPelanggan,
        id_perbaikan: rows[0].id_perbaikan,
        jenis_perbaikan: rows[0].jenis_perbaikan,
        dataPerbaikan: dataPerbaikan,
        id_permasalahan: rows[0].id_permasalahan,
        jenis_permasalahan: rows[0].jenis_permasalahan,
        dataPermasalahan: dataPermasalahan,
        tanggal_pemeriksaan: rows[0].tanggal_pemeriksaan,
        nama: rows[0].nama,
        alamat: rows[0].alamat,
        no_kunci: rows[0].no_kunci,
        tarif: rows[0].tarif,
        daya: rows[0].daya,
        fakm: rows[0].fakm,
        merk_meter: rows[0].merk_meter,
        tipe_meter: rows[0].tipe_meter,
        no_meter: rows[0].no_meter,
        latitude: rows[0].latitude,
        longitude: rows[0].longitude,
        lwbp: rows[0].lwbp,
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
        petugas: rows[0].petugas,
      });
    } else {
      res.status(404).send('Data Survei Tidak Ditemukan!');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/create", async function (req, res, next) {
  try { 
    let rows = await Model_Data_Survei.getAll();
    let Data = await Model_Users.getAll();
    res.render("data_survei/create", {
      data: rows,
      email: Data[0].email
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
        id_pel, tanggal_pemeriksaan, nama, alamat, no_kunci, tarif, daya, fakm, merk_meter, tipe_meter, no_meter,
        latitude, longitude, lwbp, wbp, bp, total, kvarh, merk_cb_mccb, tipe_cb_mccb, merk_ct, penggantian_modem, no_meter_update, 
        merk_modem, tipe_modem, imei_modem, simcard, ip_access, shuntrip, error_kwh_persen, 
        id_permasalahan, id_perbaikan, petugas
      } = req.body;

      let Data = {
          id_pel,
          tanggal_pemeriksaan,
          nama,
          alamat,
          no_kunci,
          tarif,
          daya,
          fakm,
          merk_meter,
          tipe_meter,
          no_meter,
          latitude, 
          longitude,
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
    let dataPerbaikan = await Model_Perbaikan.getAll();
    let dataPermasalahan = await Model_Permasalahan.getAll();
    let rows = await Model_Data_Survei.getId(id);
    let Data = await Model_Users.getAll();
    if (rows.length > 0) {
      res.render("data_survei/edit", {
        id: rows[0].id_data_survei,
        email: Data[0].email,
        id_pel: rows[0].id_pel,
        dataPelanggan: dataPelanggan,
        id_perbaikan: rows[0].id_perbaikan,
        dataPerbaikan: dataPerbaikan,
        id_permasalahan: rows[0].id_permasalahan,
        dataPermasalahan: dataPermasalahan,
        tanggal_pemeriksaan: rows[0].tanggal_pemeriksaan,
        nama: rows[0].nama,
        alamat: rows[0].alamat,
        no_kunci: rows[0].no_kunci,
        tarif: rows[0].tarif,
        daya: rows[0].daya,
        fakm: rows[0].fakm,
        merk_meter: rows[0].merk_meter,
        tipe_meter: rows[0].tipe_meter,
        no_meter: rows[0].no_meter,
        latitude: rows[0].latitude, 
        longitude: rows[0].longitude,
        lwbp: rows[0].lwbp,
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

router.post("/update/:id", upload.fields([
  { name: "foto_phasor", maxCount: 1 },
  { name: "foto_app", maxCount: 1 },
  { name: "foto_meter", maxCount: 1 },
  { name: "foto_ct", maxCount: 1 },
  { name: "foto_cb_mccb", maxCount: 1 },
  { name: "foto_ba", maxCount: 1 },
  { name: "foto_segel", maxCount: 1 }
]), async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await Model_Data_Survei.getId(id);
    if (rows.length === 0) {
      return res.status(404).send('Data not found');
    }

    // Get the existing data
    let existingData = rows[0];

    // Prepare the data for update
    let updatedData = {
      id_pel: req.body.id_pel,
      tanggal_pemeriksaan: existingData.tanggal_pemeriksaan,
      nama: req.body.nama,
      alamat: req.body.alamat,
      tarif: req.body.tarif,
      daya: req.body.daya,
      fakm: req.body.fakm,
      merk_meter: req.body.merk_meter,
      tipe_meter: req.body.tipe_meter,
      no_meter: req.body.no_meter,
      latitude: existingData.latitude,
      longitude: existingData.longitude,
      lwbp: req.body.lwbp,
      wbp: req.body.wbp,
      bp: req.body.bp,
      total: req.body.total,
      kvarh: req.body.kvarh,
      merk_cb_mccb: req.body.merk_cb_mccb,
      tipe_cb_mccb: req.body.tipe_cb_mccb,
      merk_ct: req.body.merk_ct,
      penggantian_modem: req.body.penggantian_modem,
      no_meter_update: req.body.no_meter_update,
      merk_modem: req.body.merk_modem,
      tipe_modem: req.body.tipe_modem,
      imei_modem: req.body.imei_modem,
      simcard: req.body.simcard,
      ip_access: req.body.ip_access,
      shuntrip: req.body.shuntrip,
      error_kwh_persen: req.body.error_kwh_persen,
      id_permasalahan: req.body.id_permasalahan,
      id_perbaikan: req.body.id_perbaikan,
      petugas: req.body.petugas,
    };

    // Update file fields if new files are uploaded
    for (let fileField of ['foto_phasor', 'foto_app', 'foto_meter', 'foto_ct', 'foto_cb_mccb', 'foto_ba', 'foto_segel']) {
      if (req.files[fileField] && req.files[fileField][0]) {
        // Delete old file if exists
        if (existingData[fileField]) {
          const oldFilePath = path.join(__dirname, "../public/images/upload", existingData[fileField]);
          fs.unlinkSync(oldFilePath);
        }
        // Set new file name
        updatedData[fileField] = req.files[fileField][0].filename;
      } else {
        // Keep the old file name if no new file is uploaded
        updatedData[fileField] = existingData[fileField];
      }
    }

    // Update the data in the database
    await Model_Data_Survei.Update(id, updatedData);
    req.flash("success", "Berhasil memperbarui data");
    res.redirect("/data_survei");
  } catch (error) {
    console.log(error);
    req.flash("error", "Terjadi kesalahan saat memperbarui data");
    res.redirect("/data_survei/edit/" + req.params.id);
  }
});

router.get("/delete/(:id)", async function (req, res) {
  let id = req.params.id;
  let rows = await Model_Data_Survei.getId(id);

  if (rows.length > 0) {
    // Delete all associated files
    const fileFields = [
      'foto_phasor',
      'foto_app',
      'foto_meter',
      'foto_ct',
      'foto_cb_mccb',
      'foto_ba',
      'foto_segel'
    ];

    // Loop through each file field and delete the associated file if it exists
    for (let fileField of fileFields) {
      const fileName = rows[0][fileField]; // Get the current file name
      if (fileName) {
        const filePath = path.join(__dirname, '../public/images/upload', fileName);
        // Check if the file exists before attempting to delete it
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Delete the file
        }
      }
    }

    // Now delete the data from the database
    await Model_Data_Survei.Delete(id);
    req.flash("success", "Berhasil menghapus data");
    res.redirect("/data_survei");
  } else {
    req.flash("error", "Data tidak ditemukan");
    res.redirect("/data_survei");
  }
});

router.get("/data_pelanggan/:id_pel", (req, res) => {
  const id_pel = req.params.id_pel;
  const query = 'SELECT * FROM pelanggan WHERE id_pel = ?';
  
  db.query(query, [id_pel], (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Error fetching data' });
      }
      // Pastikan ada data pelanggan yang ditemukan
      if (result.length > 0) {
          res.json(result[0]); // Mengirim data pelanggan pertama
      } else {
          res.status(404).json({ error: 'Data pelanggan tidak ditemukan' });
      }
  });
});

module.exports = router;