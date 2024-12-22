var express = require("express");
var router = express.Router();
const Model_Users = require("../models/Model_Users.js");
const Model_Perbaikan = require("../models/Model_Perbaikan.js");


router.get("/", async function (req, res, next) {
  try {
    let id = req.session.userId;
    let Data = await Model_Users.getId(id);
    if (Data.length > 0) {
      let rows = await Model_Perbaikan.getAll();
      res.render("perbaikan/perbaikan", {
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

// Route untuk masuk ke view tambah data perbaikan
router.get("/create", async function (req, res, next) {
  try {
    let perbaikan = await Model_Perbaikan.getAll();
    res.render("perbaikan/create", {
      jenis_perbaikan: "",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Route untuk menambah data perbaikan
router.post('/store', async function (req, res, next) {
    try {
        let { jenis_perbaikan } = req.body;
        let Data = {
            jenis_perbaikan
        };
        await Model_Perbaikan.Store(Data);
        req.flash("success", "Berhasil Menyimpan Data");
        res.redirect("/perbaikan");
        } catch (error) {
        console.log(error);
        req.flash("error", "Gagal menyimpan data");
        res.redirect("/perbaikan");
        }
    }
);

// Route untuk masuk ke view edit data perbaikan
router.get("/edit/:id", async function (req, res, next) {
  try {
      let id = req.params.id;
      let rows = await Model_Perbaikan.getId(id);
      let Data = await Model_Users.getAll();
      if (rows.length > 0) {
          res.render("perbaikan/edit", {
              id: rows[0].id_perbaikan,
              jenis_perbaikan: rows[0].jenis_perbaikan,
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

// Route untuk mengupdate data perbaikan
router.post('/update/(:id)', async function (req, res, next) {
  try {
      let id = req.params.id;
      let { jenis_perbaikan } = req.body;
      let Data = {
        jenis_perbaikan
      };

      await Model_Perbaikan.Update(id, Data);
      req.flash("Success", "Berhasil menyimpan data");
      res.redirect("/perbaikan");
  } catch (error) {
      console.log(error);
      req.flash("error", "Terjadi kesalahan pada fungsi");
      res.redirect("/perbaikan");
  }
});

// Route untuk menghapus data perbaikan
router.get("/delete/:id", async function (req, res) {
  let id = req.params.id;
  try {
    await Model_Perbaikan.Delete(id);
    req.flash("success", "Berhasil Menghapus Data");
    res.redirect("/perbaikan");
  } catch (error) {
    console.log(error);
    req.flash("error", "Terjadi Kesalahan Saat Menghapus Data.");
    res.redirect("/perbaikan");
  }
});

module.exports = router;