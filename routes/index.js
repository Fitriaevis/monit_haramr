var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var Model_Users = require('../models/Model_Users');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/register', function (req, res, next) {
    res.render('auth/register');
});

router.get('/login', function (req, res, next) {
    res.render('auth/login');
});

router.post('/saveusers', async (req, res) => {
    let { nama_user, no_telepon, jabatan, alamat_user, email, password, role } = req.body; 
    let enkripsi = await bcrypt.hash(password, 10);
    let data = {
        nama_user,
        no_telepon,
        jabatan,
        alamat_user,
        email,
        password: enkripsi,
        role 
    };
    try {
        await Model_Users.Store(data);
        req.flash('success', 'Berhasil mendaftar');
        res.redirect('/login');
    } catch (err) {
        console.error("Error saving user:", err);
        req.flash('error', 'Gagal mendaftar');
        res.redirect('/register');
    }
});


// router log
router.post('/log', async (req, res) => {
    let { email, password } = req.body;
    try {
        let Data = await Model_Users.Login(email);
        if (Data.length > 0) {
            let enkripsi = Data[0].password;
            let cek = await bcrypt.compare(password, enkripsi);
            if (cek) {
                req.session.userId = Data[0].id_user;
                if (Data[0].role == 'admin') {
                    req.flash('success', 'Berhasil login');
                    res.redirect('/admin')
                } else if(Data[0].role == 'petugas'){
                    req.flash('success', 'Berhasil login');
                    res.redirect('/petugas');
                }else{
                    res.redirect('/login');
                }
            } else {
                req.flash('error', 'Email atau password salah');
                res.redirect('/login');
            }
        } else {
            req.flash('error', 'Akun tidak ditemukan');
            res.redirect('/login');
        }
    } catch (err) {
        res.redirect('/login');
        req.flash('error', 'Error pada fungsi');
    }
});

// router get handle logout
router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.error(err);
        } else {
            res.redirect("/login");
        }
    });
});

module.exports = router;
