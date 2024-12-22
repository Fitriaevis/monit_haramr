var express = require("express");
var router = express.Router();
const Model_Users = require("../models/Model_Users.js");
const Model_Permasalahan = require("../models/Model_Permasalahan.js");


// Route untuk melihat semua data permasalahan
router.get("/", async function (req, res, next) {
  try {
    let id = req.session.userId;
    let Data = await Model_Users.getId(id);
    if (Data.length > 0) {
      let rows = await Model_Permasalahan.getAll();
      res.render("permasalahan/permasalahan", {
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

// Route untuk masuk ke view tambah data permasalahan
router.get("/create", async function (req, res, next) {
  try {
    let permasalahan = await Model_Permasalahan.getAll();
    res.render("permasalahan/create", {
      jenis_permasalahan: "",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Route untuk menambah data permasalahan
router.post("/store", async function (req, res, next) {
    try {
        let { jenis_permasalahan } = req.body;
        let Data = {
            jenis_permasalahan
        };
        await Model_Permasalahan.Store(Data);
        req.flash("success", "Berhasil Menyimpan Data");
        res.redirect("/permasalahan");
        } catch (error) {
        console.log(error);
        req.flash("error", "Gagal Menyimpan Data");
        res.redirect("/permasalahan");
        }
    }
);

// Route untuk masuk ke view edit data permasalahan
router.get("/edit/:id", async function (req, res, next) {
    try {
        let id = req.params.id;
        let rows = await Model_Permasalahan.getId(id);
        let Data = await Model_Users.getAll();
        if (rows.length > 0) {
            res.render("permasalahan/edit", {
                id: rows[0].id_permasalahan,
                jenis_permasalahan: rows[0].jenis_permasalahan,
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
  
// Route untuk mengupdate data permasalahan
router.post('/update/(:id)', async function (req, res, next) {
  try {
      let id = req.params.id;
      let { jenis_permasalahan } = req.body;
      let Data = {
        jenis_permasalahan
      };
      await Model_Permasalahan.Update(id, Data);
      req.flash("Success", "Berhasil menyimpan data");
      res.redirect("/permasalahan");
  } catch (error) {
      console.log(error);
      req.flash("error", "Terjadi kesalahan pada fungsi");
      res.redirect("/permasalahan");
  }
});

// Route untuk menghapus data permasalahan
router.get("/delete/:id", async function (req, res) {
  let id = req.params.id;
  try {
    await Model_Permasalahan.Delete(id); // Menghapus data pelanggan berdasarkan ID
    req.flash("success", "Berhasil Menghapus Data");
    res.redirect("/permasalahan");
  } catch (error) {
    console.log(error);
    req.flash("error", "Terjadi Kesalahan Saat Menghapus Data.");
    res.redirect("/permasalahan");
  }
});

module.exports = router;