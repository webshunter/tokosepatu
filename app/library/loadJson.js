import provinsi from '../wilayah/provinces.json';
import kota from '../wilayah/regencies.json';
import kecamatan from '../wilayah/districts.json';

Array.prototype.cond = function (search = '', name = '') {
    if (search != '') {
        if (typeof search == 'number') {
            search = search.toString().toLowerCase();
        } else {
            search = search.toLowerCase();
        }

        var data = this;
        return data.filter(function (dat) {
            if (typeof dat == 'object') {
                var g = dat[name];
                var numcek = 0;
                if (g != null) {
                    if (typeof g == 'number') {
                        g = g.toString().toLowerCase();
                    } else {
                        g = g.toLowerCase();
                    }
                    if (numcek == 0) {
                        if (g == search) {
                            numcek = 1;
                        }
                    }
                }
                if (numcek == 1) {
                    return dat;
                }
            } else {
                if (dat != null) {
                    if (typeof dat == 'number') {
                        var dats = dat.toString().toLowerCase();
                        if (dats == search) {
                            return dat
                        }
                    } else {
                        if (dat.toLowerCase() == search) {
                            return dat
                        }
                    }
                }
            }
        })
    } else {
        return [];
    }
}

export const dataWilayah = function(){
    return {
        provinsi: provinsi,
        kota: kota,
        kecamatan: kecamatan,
        getProvinsi: function (id) {
            let provinsi = this.provinsi;
            let [dataProv] = provinsi.cond(id, 'id')
            if(dataProv){
                return {
                    id: dataProv.id,
                    nama: dataProv.name,
                    lat: dataProv.latitude,
                    long: dataProv.longitude,
                }
            }
            return null;
        }
        ,getKota: function (id) {
            let kota = this.kota;
            let [dataProv] = kota.cond(id, 'id')
            if(dataProv){
                return {
                    id: dataProv.id,
                    nama: dataProv.name,
                    lat: dataProv.latitude,
                    long: dataProv.longitude,
                }
            }
            return null;
        }
        ,getKecamatan: function (id) {
            let kecamatan = this.kecamatan;
            let [dataProv] = kecamatan.cond(id, 'id')
            if(dataProv){
                return {
                    id: dataProv.id,
                    nama: dataProv.name,
                    lat: dataProv.latitude,
                    long: dataProv.longitude,
                }
            }
            return null;
        }
        , getGroupKota: function (idprov) {
            let provinsi = this.kota;
            let dataKota = provinsi.cond(idprov, 'province_id')
            return dataKota;
        }
        , getGroupKecamatan: function (idkota) {
            let provinsi = this.kecamatan;
            let dataKota = provinsi.cond(idkota, 'regency_id')
            return dataKota;
        }
    }
}
