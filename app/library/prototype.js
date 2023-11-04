
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
} 