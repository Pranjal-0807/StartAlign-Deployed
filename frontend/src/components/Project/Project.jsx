import React from "react";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import SubTasks from "../SubTask/SubTasks";
import { useParams } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";
import { useNavigate } from "react-router-dom";
import CreateSubTask from "../SubTask/CreateSubTask";

const Project = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  let project = useSelector((state) =>
    state.project.projects.find((project) => project._id === projectId)
  );
  project = project || {};

  return (
    <div className="m-4 max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border">
      <ArrowLeft
        className="cursor-pointer"
        onClick={() => navigate("/projects")}
      />
      <ProjectDetails project={project} />
      <SubTasks projectId={projectId} />
      <CreateSubTask projectId={projectId} />
    </div>
  );
};

export default Project;
