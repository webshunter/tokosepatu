import React, { useState } from 'react';

export const ImageUpload = () => {
        const [selectedImages, setSelectedImages] = useState([]);
      
        const handleImageChange = (e) => {
          const files = Array.from(e.target.files);
      
          if (selectedImages.length + files.length <= 20) {
            setSelectedImages([...selectedImages, ...files]);
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
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <div className='pt-4' style={{maxWidth: '560px'}}>
              {selectedImages.map((image, index) => (
                <div key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '10px', marginBottom: '10px' }}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Gambar ${index + 1}`}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    style={{ position: 'absolute', top: '0', right: '0', backgroundColor: 'rgba(0,47,52,0.64)' }}
                  >
                    <svg fill="#eee" width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-o3KKi" d="M878.336 85.333l-366.336 366.315-366.336-366.315h-60.331v60.331l366.336 366.336-366.336 366.336v60.331h60.331l366.336-366.336 366.336 366.336h60.331v-60.331l-366.315-366.336 366.315-366.336v-60.331z"></path></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
};