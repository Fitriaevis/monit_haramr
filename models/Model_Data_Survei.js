const connection = require('../config/database');

class Model_Data_Survei {

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT a.id_data_survei, b.id_pel, a.tanggal_pemeriksaan, b.nama, b.alamat, b.no_kunci, b.tarif, b.daya, b.fakm, b.merk_meter,' + 
                'b.tipe_meter, b.no_meter, a.longitude, a.latitude, a.lwbp, a.wbp, a.bp, a.total, a.kvarh, a.merk_cb_mccb, a.tipe_cb_mccb, a.merk_ct,' + 
                'a.penggantian_modem, a.no_meter_update, a.merk_modem, a.tipe_modem, a.imei_modem, a.simcard, a.ip_access, a.foto_phasor, a.foto_app, a.foto_meter, ' + 
                'a.foto_ct, a.foto_cb_mccb, a.foto_ba, a.shuntrip, a.foto_segel, a.error_kwh_persen, c.id_permasalahan, c.jenis_permasalahan, d.id_perbaikan, d.jenis_perbaikan, a.petugas ' + 
                'FROM data_survei as a ' + 
                'INNER JOIN pelanggan as b ON a.id_pel = b.id_pel ' + 
                'INNER JOIN permasalahan as c ON a.id_permasalahan = c.id_permasalahan ' + 
                'INNER JOIN perbaikan as d ON a.id_perbaikan = d.id_perbaikan ' + 
                'ORDER BY a.id_data_survei DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async Store(Data) {
    return new Promise(async (resolve, reject) => {
        try {
            // Ambil data pelanggan berdasarkan id_pel
            const pelangganQuery = 'SELECT nama, alamat, no_kunci, tarif, daya, fakm, merk_meter, tipe_meter, no_meter FROM pelanggan WHERE id_pel = ?';
            const pelanggan = await new Promise((resolvePelanggan, rejectPelanggan) => {
                connection.query(pelangganQuery, [Data.id_pel], (err, rows) => {
                    if (err) {
                        return rejectPelanggan(err);
                    }
                    resolvePelanggan(rows[0]);
                });
            });
            const combinedData = {
                ...Data,
                ...pelanggan
            };
            connection.query('INSERT INTO data_survei SET ?', combinedData, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    });
}
    
    static async getId(id) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    a.id_data_survei, b.id_pel, a.tanggal_pemeriksaan, b.nama, b.alamat, b.tarif, b.daya, b.fakm, b.no_kunci, b.merk_meter,
                    b.tipe_meter, b.no_meter, a.longitude, a.latitude, a.lwbp, a.wbp, a.bp, a.total, a.kvarh, a.merk_cb_mccb, a.tipe_cb_mccb, a.merk_ct,
                    a.penggantian_modem, a.no_meter_update, a.merk_modem, a.tipe_modem, a.imei_modem, a.simcard, a.ip_access, a.foto_phasor, a.foto_app, 
                    a.foto_meter, a.foto_ct, a.foto_cb_mccb, a.foto_ba, a.shuntrip, a.foto_segel, a.error_kwh_persen, c.id_permasalahan, 
                    c.jenis_permasalahan, d.id_perbaikan, d.jenis_perbaikan, a.petugas
                FROM 
                    data_survei as a 
                    INNER JOIN pelanggan as b ON a.id_pel = b.id_pel 
                    INNER JOIN permasalahan as c ON a.id_permasalahan = c.id_permasalahan 
                    INNER JOIN perbaikan as d ON a.id_perbaikan = d.id_perbaikan 
                WHERE 
                    a.id_data_survei = ?`;
    
            connection.query(query, [id], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }    
    
    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE data_survei SET ? WHERE id_data_survei = ' + id, Data, function(err, result) {
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
    }
    
    
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM data_survei WHERE id_data_survei = ' + id, function(err, result) {
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = Model_Data_Survei;