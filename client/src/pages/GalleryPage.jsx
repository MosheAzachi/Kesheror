import { useState } from "react";
import { galleryItems } from "../common/galleryData";
function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div className="page-container">
      <h1>גלריה</h1>
      <div className="image grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <img
            src={item.image}
            alt={item.title}
            className=" h-60 w-full rounded-lg shadow-lg hover: cursor-pointer"
            onClick={() => setSelectedImage(item.image)}
          />
        ))}
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Selected" className="max-w-[90%] max-h-[90%] rounded-lg" />
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
