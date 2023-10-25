import { postAction } from './post';

const slicing = function (string, a = 1000) {
    var start = a;
    var arrayBaru = [];
    var total = Math.ceil(string.length / a);
    for (var n = 0; n < total; n++) {
        var f = (n + 1) * start;
        var x = n * start;
        arrayBaru.push(string.substring(x, f));
    }
    return arrayBaru;
}

const upload = function (url = '/admin/upload', path = '', name = 'data.post', data = null, funcpro, funcres) {
    var rendr = data;
    rendr = slicing(rendr, 100000);
    var length = rendr.length;
    var start = 0;
    var itm = Date.now();
    function uploadProsses() {
        if (start < length) {
            funcpro(Math.round(((start + 1) / length) * 100) + '%');
            postAction(url, {
                ok: rendr[start],
                start: start,
                end: length - 1,
                path: path,
                tipe: path + name,
                enm: itm
            })
            .then(function(e){
                return e.json();
            })
            .then(function(e){
                if (start == (length - 1)) {
                    funcres(e);
                } else {
                    start += 1;
                    uploadProsses();
                }
            }).catch(function(e){
                console.log(e);
            });
        }
    }

    uploadProsses()

}

export default upload;