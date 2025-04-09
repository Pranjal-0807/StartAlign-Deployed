import { X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileUpload from "../FileUpload/FileUpload";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { deleteProject } from "../../store/slices/projectSlice";

const ProjectDetails = ({ project }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleDelete = () => {
    dispatch(deleteProject(project._id)).then(() => navigate("/projects"));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
        {project.title}
      </h1>

      <p className="text-gray-600 mb-4">{project.description}</p>

      <div className="space-y-2">
        <p>
          <span className="font-semibold text-gray-700">Status:</span>{" "}
          <span
            className={`text-md font-medium px-3 py-1 rounded-md text-center ${
              project.status === "Completed"
                ? "bg-green-100 text-green-600"
                : project.status === "Pending"
                ? "bg-yellow-100 text-yellow-600"
                : project.status === "In Progress"
                ? "bg-blue-100 text-blue-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {project.status}
          </span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">Priority:</span>{" "}
          <span
            className={`text-md font-medium px-3 py-1 rounded-md text-center ${
              project.priority === "Low"
                ? "bg-green-100 text-green-600"
                : project.priority === "Medium"
                ? "bg-yellow-100 text-yellow-600"
                : project.priority === "High"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {project.priority}
          </span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">Due Date:</span>{" "}
          <span className="text-md font-medium text-gray-600 font-mono">
            {new Date(project.due_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </p>
      </div>

      <button
        onClick={handleDelete}
        className="mt-6 cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
      >
        <FaTrash className="inline-block" />
      </button>

      {/* Upload File  */}
      {/* <FileUpload projectId={project._id} /> */}
      <button
        onClick={() => setShow(!show)}
        className="ml-4 mt-6 cursor-pointer bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
      >
        {show ? (
          <X className="inline-block" />
        ) : (
          <FaCloudUploadAlt className="inline-block" />
        )}
      </button>
      {show && <FileUpload />}
    </div>
  );
};

export default ProjectDetails;
