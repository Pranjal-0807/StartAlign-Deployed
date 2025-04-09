import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadFile } from "../../store/slices/uploadFileSlice";

const FileUpload = () => {
  const dispatch = useDispatch();
  const { uploadedFile, successMsg, errorMsg, loading } = useSelector(
    (state) => state.files
  );

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    dispatch(uploadFile(data?.file));
  };

  return (
    <div className="p-4 border rounded-lg">
      <form onSubmit={handleUpload}>
        <input type="file" name="file" />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {successMsg ? (
        <p className="mt-2 text-green-500">{successMsg}</p>
      ) : (
        <p className="mt-2 text-red-500">{errorMsg}</p>
      )}

      {uploadedFile && (
        <div className="mt-4">
          <p>Uploaded File:</p>
          <img
            src={uploadedFile}
            alt="Uploaded"
            className="w-40 h-40 object-cover mt-2"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
