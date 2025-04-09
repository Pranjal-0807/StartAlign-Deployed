import React from "react";

const Paragraph = ({ paraText, cssClass }) => {
  return (
    <p
      className={
        cssClass
          ? cssClass
          : "text-base md:text-lg font-semibold text-gray-800 text-center md:text-left"
      }
    >
      {paraText}
    </p>
  );
};

const ProjectSummary = ({ project }) => {
  return (
    <div className="w-full md:w-[300px] aspect-square bg-white p-4 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-xl border-l-4 border-blue-500 flex flex-col justify-around mb-4">
      <Paragraph
        paraText={project.title}
        cssClass="text-base md:text-xl font-bold text-gray-900 text-center"
      />
      <Paragraph
        paraText={project.priority}
        cssClass={`text-sm md:text-md font-semibold px-3 py-1 md:px-4 md:py-2 rounded-full text-center mx-auto ${project.priority === "Low"
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
        cssClass="text-sm md:text-md font-medium text-gray-600 font-mono text-center"
      />
      <Paragraph
        paraText={project.status}
        cssClass={`text-sm md:text-md font-semibold px-3 py-1 md:px-4 md:py-2 rounded-full text-center mx-auto ${project.status === "Completed"
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



// import React from "react";

// const Paragraph = ({ paraText, cssClass }) => {
//   return (
//     <p
//       className={
//         cssClass
//           ? cssClass
//           : "text-lg font-semibold text-gray-800 text-center md:text-left"
//       }
//     >
//       {paraText}
//     </p>
//   );
// };

// const ProjectSummary = ({ project }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 bg-white shadow-lg rounded-lg mb-4 border-l-4 border-blue-500 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
//       <Paragraph paraText={project.title} />
//       <Paragraph
//         paraText={project.priority}
//         cssClass={`text-md font-medium px-3 py-1 rounded-md text-center ${
//           project.priority === "Low"
//             ? "bg-green-100 text-green-600"
//             : project.priority === "Medium"
//             ? "bg-yellow-100 text-yellow-600"
//             : project.priority === "High"
//             ? "bg-red-100 text-red-600"
//             : "bg-blue-100 text-blue-600"
//         }`}
//       />
//       <Paragraph
//         paraText={new Date(project.due_date).toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         })}
//         cssClass="text-md font-medium text-gray-600 font-mono text-center"
//       />
//       <Paragraph
//         paraText={project.status}
//         cssClass={`text-md font-medium px-3 py-1 rounded-md text-center ${
//           project.status === "Completed"
//             ? "bg-green-100 text-green-600"
//             : project.status === "Pending"
//             ? "bg-yellow-100 text-yellow-600"
//             : project.status === "In Progress"
//             ? "bg-blue-100 text-blue-600"
//             : "bg-red-100 text-red-600"
//         }`}
//       />
//     </div>
//   );
// };

// export default ProjectSummary;
