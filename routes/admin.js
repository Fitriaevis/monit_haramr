var express = require('express');
const Model_Users = require('../models/Model_Users');
const Model_Pelanggan = require("../models/Model_Pelanggan.js")
const Model_Permasalahan = require("../models/Model_Permasalahan.js")
const Model_Perbaikan = require("../models/Model_Perbaikan.js")
const Model_Data_Survei = require("../models/Model_Data_Survei.js");
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        let id = req.session.userId;
        let Data = await Model_Users.getId(id);
        let dataPelanggan = await Model_Pelanggan.getAll();
        let dataPermasalahan = await Model_Permasalahan.getAll();
        let dataPerbaikan = await Model_Perbaikan.getAll();
        let dataSurvei = await Model_Data_Survei.getAll();
        if (Data.length > 0) {
            if (Data[0].role != 'admin') {
                res.redirect('/logout')
            } else {
                res.render('users/admin', {
                title: 'Users Home',
                email: Data[0].email,
                nama_user: Data[0].nama_user,
                alamat_user: Data[0].alamat_user,
                jabatan: Data[0].jabatan,
                no_telepon: Data[0].no_telepon,
                dataPerbaikan: dataPerbaikan,
                dataPermasalahan: dataPermasalahan,
                dataPelanggan: dataPelanggan,
                dataSurvei: dataSurvei,
                latitude: Data[0].latitude,
                longitude: Data[0].longitude,
                nama: Data[0].nama,
                alamat: Data[0].alamat,
                });
            }
        } else {
        res.status(401).json({ error: 'users tidak ada' });
        }
    } catch (error) {
        res.redirect("/login");
    }
});

module.exports = router;
