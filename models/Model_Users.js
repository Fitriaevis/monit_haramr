const connection = require('../config/database');

class Model_Users {
//mengambil data
static async getAll(){
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users ORDER BY id_user DESC', (err, rows) => {
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        });
    });
}
//menyimpan data
static async Store(Data){
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO users SET ?', Data, function(err, result){
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}
// mengambil data login berdasarkan email
static async Login(email){
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE email = ?', [email], function(err, result){
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}
//mengambil data berdasarkan ID
static async getId(id){
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE id_user = ' + id, (err, rows) => {
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        })
    });
}
//mengupdate data
static async Update(id, Data){
    return new Promise((resolve, reject) => {
        connection.query('UPDATE users SET ? WHERE id_user = ' + id, Data, function(err, result){
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}
//menghapus data
static async Delete(id){
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM users WHERE id_user = ' + id, function(err, result){
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    });
}

}


module.exports = Model_Users;