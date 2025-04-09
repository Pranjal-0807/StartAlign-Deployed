import React from "react";

const Paragraph = ({ paraText, cssClass }) => {
  return (
    <p
      className={
        cssClass
          ? cssClass
          : "text-lg font-semibold text-gray-800 text-center md:text-left"
      }
    >
      {paraText}
    </p>
  );
};

const ProjectSummary = ({ project }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 bg-white shadow-lg rounded-lg mb-4 border-l-4 border-blue-500 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
      <Paragraph paraText={project.title} />
      <Paragraph
        paraText={project.priority}
        cssClass={`text-md font-medium px-3 py-1 rounded-md text-center ${
          project.priority === "Low"
            ? "bg-green-100 text-green-600"
            : project.priority === "Medium"
            ? "bg-yellow-100 text-yellow-600"
            : project.priority === "High"
            ? "bg-red-100 text-red-600"
            : "bg-blue-100 text-blue-600"
        }`}
      />
      <Paragraph
        paraText={new Date(project.due_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
        cssClass="text-md font-medium text-gray-600 font-mono text-center"
      />
      <Paragraph
        paraText={project.status}
        cssClass={`text-md font-medium px-3 py-1 rounded-md text-center ${
          project.status === "Completed"
            ? "bg-green-100 text-green-600"
            : project.status === "Pending"
            ? "bg-yellow-100 text-yellow-600"
            : project.status === "In Progress"
            ? "bg-blue-100 text-blue-600"
            : "bg-red-100 text-red-600"
        }`}
      />
    </div>
  );
};

export default ProjectSummary;
