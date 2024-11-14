var express = require('express');
const Model_Users = require('../models/Model_Users');
var router = express.Router();
const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function (req, res, next) {
  res.render('auth/register');
});

router.get('/login', function (req, res, next) {
  res.render('auth/login');
});

router.post('/saveusers', async (req, res) => {
  let { username, nama_user, email, password, role } = req.body;
  let enkripsi = await bcrypt.hash(password, 10);
  let data = {
    username,
    nama_user,
    email, 
    password: enkripsi,
    role
  };
  try {
    await Model_Users.Store(data);
    req.flash('success', 'Berhasil Registrasi');
    res.redirect('/login');
  } catch (err) {
    console.error("Error saving user:", err);
    req.flash('error', 'Gagal Registrasi');
    res.redirect('/register');
  }
})

router.post('/log', async (req, res) => {
  let { email, password } = req.body;
  try {
    // Mengambil data user berdasarkan email
    let Data = await Model_Users.Login(email);
    if (Data.length > 0) {
      let enkripsi = Data[0].password;
      // Membandingkan password yang diinput dengan password yang di-hash
      let cek = await bcrypt.compare(password, enkripsi);
      if (cek) {
        // Menyimpan ID user dan role di session
        req.session.userId = Data[0].id_user;
        req.session.role = Data[0].role;
        // Redirect berdasarkan role user
        if (Data[0].role == 'admin') {
          req.flash('success', 'Berhasil login!');
          res.redirect('/data_survei');
        } else if (Data[0].role == 'petugas') {
          req.flash('success', 'Berhasil login');
          res.redirect('/data_survei');
        } else {
          req.flash('error', 'Role tidak dikenali');
          res.redirect('/login');
        }
      } else {
        req.flash('error', 'Email atau password salah!');
        res.redirect('/login'); //bug in here
      }
    } else {
      req.flash('error', 'Akun tidak ditemukan!');
      res.redirect('/login');
    }
  } catch (err) {
    req.flash('error', 'Terjadi kesalahan pada server!');
    res.redirect('/login');
    console.log(err);
  }
});

router.get('/logout', function (req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.error(err);
    } else {
      res.redirect('/login');
    }
  });
});


module.exports = router;
