const connection = require('../config/database');

class Model_Pelanggan {

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pelanggan ORDER BY kode_pelanggan DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO pelanggan SET ?', Data, function(err, result){
                if(err) {
                    reject(err);
                }else{
                    resolve(result);
                    console.log(err);
                }
            });
        });
    }
    
    static async getId(kode) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pelanggan WHERE kode_pelanggan = ?', [kode], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    
    static async Update(kode, Data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE pelanggan SET ? WHERE kode_pelanggan = ?', [Data, kode], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
    static async Delete(kode) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM pelanggan WHERE kode_pelanggan = ?', [kode], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = Model_Pelanggan;
