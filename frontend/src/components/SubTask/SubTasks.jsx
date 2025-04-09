import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubTasks, deleteSubTask } from "../../store/slices/subTaskSlice";
import { FaTrash } from "react-icons/fa";

const SubTasks = ({ projectId }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.subTask.error);
  const subTasks = useSelector((state) => state.subTask.subTasks);

  React.useEffect(() => {
    dispatch(fetchSubTasks(projectId));
    // return () => {
    //   dispatch(fetchSubTasks([]));
    // };
  }, [projectId, dispatch]);

  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold text-center mb-4">SubTasks</h2>
      <div className="grid gap-4">
        {subTasks.map((subTask) => (
          <div
            key={subTask._id}
            className="grid grid-cols-5 gap-4 items-center p-4 bg-white shadow-xl rounded-lg border-l-4 border-blue-500 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            {/* SubTask Name */}
            <p className="text-lg font-semibold text-gray-800 text-center">
              {subTask.subTaskName}
            </p>

            {/* Status Badge */}
            <p
              className={`text-md font-medium px-3 py-1 rounded-md text-center ${
                subTask.status === "Completed"
                  ? "bg-green-100 text-green-600"
                  : subTask.status === "Pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : subTask.status === "In Progress"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {subTask.status}
            </p>

            {/* Deadline */}
            <p className="text-md font-medium text-gray-600 font-mono text-center">
              {new Date(subTask.deadline).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>

            {/* Assigned To */}
            <p className="text-lg font-semibold text-gray-800 text-center">
              {subTask.assignedTo}
            </p>

            {/* Trash Icon */}
            <FaTrash
              className="text-xl text-red-600 cursor-pointer mx-auto"
              onClick={() => dispatch(deleteSubTask(subTask._id))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubTasks;
