var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require('multer')
var connection = require("../config/database.js");
// const Model_Users = require("../model/Model_Users.js");
const Model_Permasalahan = require("../models/Model_Permasalahan.js");

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
//   try {
    // let id = req.session.userId;
    // let Data = await Model_Users.getId(id);
    // if (Data.length > 0) {
      let rows = await Model_Permasalahan.getAll();
      res.render("permasalahan/permasalahan", {
        data: rows,
      });
    // } else {
    //   res.redirect("/login");
    // }
//   } catch (error) {
    // res.redirect("/login");
//   }
});

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


router.post("/store", upload.single("file_report"), async function (req, res, next) {
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
        req.flash("error", "Gagal menyimpan data");
        res.redirect("/permasalahan");
        }
    }
);


router.get("/edit/:id", async function (req, res, next) {
    try {
        let id = req.params.id;
        let rows = await Model_Permasalahan.getId(id);
        
        if (rows.length > 0) {
            res.render("permasalahan/edit", {
                id: rows[0].id_permasalahan,
                jenis_permasalahan: rows[0].jenis_permasalahan
            });
        } else {
            res.status(404).send('Data not found');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
  });
  
  
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



router.get("/delete/(:id)", async function (req, res) {
  let id = req.params.id;
  let rows = await Model_Permasalahan.getId(id)
  const namaFileLama = rows[0].file_report;
  if(namaFileLama){
    const pathFileLama = path.join(__dirname, '../public/images/upload', namaFileLama);
    fs.unlinkSync(pathFileLama);
  }
  await Model_Permasalahan.Delete(id);
  req.flash("Success", "berhasil menghapus data");
  res.redirect("/permasalahan");
});

module.exports = router;