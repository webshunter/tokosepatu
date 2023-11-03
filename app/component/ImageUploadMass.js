import React, { useState } from 'react';

function convertToWebP(file, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        let width = img.width;
        let height = img.height;

        // Mengatur ukuran gambar
        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;

          if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
          }

          if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Konversi ke format WebP
        canvas.toBlob(function (blob) {
          if (!blob) {
            reject(new Error('Konversi ke format WebP gagal'));
          } else {
            resolve( blob );
          }
        }, 'image/webp', 0.8); // Kualitas gambar, dalam hal ini, 0.8
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      const base64String = reader.result.split(',')[1]; // Mengambil bagian base64 saja
      resolve(base64String);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(blob);
  });
}

export const ImageUpload = () => {
        const [selectedImages, setSelectedImages] = useState([]);
      
        const handleImageChange = async (e) => {
          const files = Array.from(e.target.files);

          function getBase64(file) {
            return new Promise((resolve, reject) => {
              var reader = new FileReader();

              reader.readAsDataURL(file);

              reader.onload = function () {
                resolve(reader.result);
              };

              reader.onerror = function (error) {
                reject(error);
              };
            });
          }

          let filesbaru = [];
          for await (const result of files ){
            let webp = await convertToWebP(result, 720, 720);
            let b64s = await blobToBase64(webp);
            filesbaru.push('data:image/webp;base64,'+b64s);
          }

      
          if (selectedImages.length + files.length <= 20) {
            setSelectedImages([...selectedImages, ...filesbaru]);
          } else {
            alert('Anda hanya dapat mengunggah maksimal 20 gambar.');
          }
        };
      
        const handleRemoveImage = (index) => {
          const updatedImages = [...selectedImages];
          updatedImages.splice(index, 1);
          setSelectedImages(updatedImages);
        };
      
        return (
          <div className='pt-4'>
            <input
              name='galery'
              type="file"
              accept="image/*"
              multiple={true}
              onChange={handleImageChange}
            />
            <div className='pt-4' style={{maxWidth: '560px'}}>
              {selectedImages.map((image, index) => (
                <div className='galery' key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '10px', marginBottom: '10px' }}>
                  <img
                    src={image}
                    alt={`Gambar ${index + 1}`}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                  <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    style={{ position: 'absolute', top: '0', right: '0', backgroundColor: 'rgba(0,47,52,0.64)' }}
                  >
                    <svg fill="#eee" width="24px" height="24px" viewBox="0 0 1024 1024" dataautid="icon" className="" fillRule="evenodd"><path className="rui-o3KKi" d="M878.336 85.333l-366.336 366.315-366.336-366.315h-60.331v60.331l366.336 366.336-366.336 366.336v60.331h60.331l366.336-366.336 366.336 366.336h60.331v-60.331l-366.315-366.336 366.315-366.336v-60.331z"></path></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
};