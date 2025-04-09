import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateProject from "./CreateProject";
import ProjectSummary from "./ProjectSummary";
import Loader from "../../dumbComponents/Loader";

const Projects = () => {
  const projects = useSelector((state) => state.project.projects);
  const loading = useSelector((state) => state.project.loading);

  return (
    <>
      {loading && <Loader />}
      <h1 className="text-3xl font-bold underline text-center">CPMT</h1>
      <div className="m-4 space-y-4 border p-4 bg-gray-100 rounded-lg shadow-md">
        {projects.map((project) => (
          <Link to={`/projects/${project._id}`} key={project._id}>
            <ProjectSummary project={project} />
          </Link>
        ))}
        <CreateProject />
      </div>
    </>
  );
};

export default Projects;
