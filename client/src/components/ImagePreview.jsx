
import { useState } from "react";
import image1 from "../assets/images/carousel1.jpg";
import image2 from "../assets/images/carousel2.jpg";
import image3 from "../assets/images/carousel3.jpg";
import image4 from "../assets/images/carousel4.png";


const ImagePreview = () => {
  const [selectedImage, setSelectedImage] = useState(image1);

  // Array of imported image references
  const images = [image1, image2, image3,image4];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">
        Find jobs based your likings
      </h1>
      <div className="flex gap-4 mb-6 justify-center overflow-x-auto">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="cursor-pointer w-24 h-24 md:w-32 md:h-32 object-cover rounded-md shadow-md"
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      {/* Display the selected image */}
      {selectedImage && (
        <div className="mt-6 p-8">
          <img
            src={selectedImage}
            alt="Selected"
            className="h-auto object-cover rounded-md shadow-lg md:max-w-5xl mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
