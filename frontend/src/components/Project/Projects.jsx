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

      <div className="relative flex justify-center items-center mt-4">
        <h1 className="text-3xl font-bold underline text-center">CPMT</h1>

        <div className="absolute right-4">
          <CreateProject />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {projects.map((project, index) => (
          <Link to={`/projects/${project._id}`} key={index}>
            <ProjectSummary key={index} project={project} />
          </Link>
        ))}
      </div>

    </>


  );
};

export default Projects;
