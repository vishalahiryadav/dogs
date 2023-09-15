import React, { useState } from "react"
function ImageGallery({ images,altText }){

    const[selectedImage,setSelectedImage]=useState(images[0]);
    const handleClick = (image)=>{
   setSelectedImage(image);
    }
    return(<div>

  <div className="main-pet-image">
  <img src={selectedImage.__filePath} alt={altText} className="selected-image"/>
  </div>
  <div className="pet-image-thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.__filePath}
            alt={altText}
            onClick={() => handleClick(image)}
            className={selectedImage === image ? "thunbnail-images active" : "thunbnail-images"}
          />
        ))}
      </div>
        
    </div>)
}
export default ImageGallery