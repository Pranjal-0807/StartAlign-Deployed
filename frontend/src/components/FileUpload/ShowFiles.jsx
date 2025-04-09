import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiles } from "../../store/slices/uploadFileSlice";

const ShowFiles = () => {
  const dispatch = useDispatch();
  const { loading, successMsg, errorMsg } = useSelector((state) => state.files);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  return (
    <div className="p-6 border rounded-lg bg-white shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-center">
        Uploaded Files Gallery
      </h3>

      {/* Loading State */}
      {loading && <p className="text-blue-500 text-center">Loading files...</p>}

      {/* Error Message */}
      {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

      {/* Success Message */}
      {successMsg && <p className="text-green-500 text-center">{successMsg}</p>}

      {/* Gallery Grid */}
      <GalleryGrid setSelectedImage={setSelectedImage} />

      {/* Image Preview Modal */}
      <ImagePreviewModal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

export default ShowFiles;

const ImagePreviewModal = ({ selectedImage, setSelectedImage }) => {
  return (
    <>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full mx-4">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-[485px] rounded-lg shadow-lg"
            />
            <button
              className="absolute top-2 right-2 text-white text-xl bg-black bg-opacity-50 rounded-full px-3 py-1 cursor-pointer"
              onClick={() => setSelectedImage(null)}
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const GalleryGrid = ({ setSelectedImage }) => {
  const files = useSelector((state) => state.files.files);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {files.map((file) => (
        <div
          key={file._id}
          className="relative group border rounded-lg overflow-hidden shadow-md cursor-pointer"
          onClick={() => setSelectedImage(file.fileUrl)}
        >
          <img
            src={file.fileUrl}
            alt={file.fileName}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-sm font-medium">
            {file.fileName}
          </div>
        </div>
      ))}
    </div>
  );
};
