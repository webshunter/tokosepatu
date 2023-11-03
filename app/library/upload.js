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


async function uploadFileInChunks(file, url, funcpro, funcres) {
    const chunkSize = 1024 * 1024; // 1MB chunks (adjust as needed)
    let start = 0;
    let size = file.size;
    let end = Math.min(chunkSize, file.size);
    let idupload = 'upload-id'+Date.now()+'.json';
    let hitung = 0;
    while (start < file.size) {
        const chunk = file.slice(start, end);
        console.log(hitung)
        console.log(chunk)
        hitung++;
        // Create form data for each chunk
        const formData = new FormData();
        formData.append('file', chunk);
        formData.append('start', start);
        formData.append('end', end);
        formData.append('size', size);
        formData.append('idupload', idupload);

        // Send the chunk to the server
        await uploadChunk(formData, url);

        start = end;
        end = Math.min(start + chunkSize, file.size);
    }
    funcpro(size);
    funcres(size);
}

async function uploadChunk(formData, url) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Error uploading chunk');
        }
        // Handle the response if needed
    } catch (error) {
        // Handle any errors
    }
}

const upload = function (url = '/admin/upload', path = '', name = 'data.post', data = null, funcpro, funcres) {
    var rendr = data;
    console.log(rendr);
    let dataBlob = new Blob([rendr], {
        type: 'text/plain'
    })
    uploadFileInChunks(dataBlob, url, funcpro, funcres);
}

export default upload;