
export const Helper = function(){
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


    Number.prototype.currency = function (a) {
        var s = this;
        if (s == null) {
            s = 0;
        }
        var num = s.valueOf().toFixed(a).formatRupiah();
        return num;
    }

    String.prototype.number = function (fn = false) {
        var s = this;
        if (fn == 2) {
            s = s.replace(/\./g, ',');
        }
        if (fn != 2) {
            s = s.replace(/[^-,\d]/g, '');
        }
        if (s == null) {
            s = '0';
        }
        if (fn == false) {
            if (s == '-') {
                return '-';
            } else if (s == '') {
                return '';
            } else {
                return Number(s.replace(/\./g, '').replace(/\,/g, '.'));
            }
        } else if (fn == true) {
            return s.replace(/\./g, '');
        } else if (fn == 2) {
            return Number(s.replace(/\,/g, '.'));
        } else {
            return Number(s.replace(/\./g, '').replace(/\,/g, '.'));
        }
    }

    String.prototype.formatRupiah = function () {
        var angka = this;
        if (angka == null || angka == '') {
            angka = 0;
            angka = angka.toFixed(2).replace(/\./g, ',');
        }
        var negative = '';
        if (angka[0] == '-') {
            negative = '-';
        }
        var angka = angka.replace(/\./g, ',')
        var prefix;
        var number_string = angka.replace(/[^,\d]/g, '').toString(),
            split = number_string.split(','),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            var separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? negative + rupiah : (rupiah ? '' + negative + rupiah : '');
    }
} 