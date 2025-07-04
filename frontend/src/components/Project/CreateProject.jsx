import React, { useState } from "react";
import { Plus } from "lucide-react";
import ProjectForm from "./ProjectForm";
import Button from "../../dumbComponents/Button";

const CreateProject = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <div className="m-4">
        <Button
          btnText={<Plus className="h-6 w-6" />}
          handleClick={() => setShowForm(true)}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 z-50">
          <ProjectForm setShowForm={setShowForm} />
        </div>
      )}
    </>
  );
};

export default CreateProject;



// import React, { useState } from "react";
// import Dropdowns from "../../dumbComponents/Dropdowns";
// import { useDispatch, useSelector } from "react-redux";
// import InputFields from "../../dumbComponents/InputFields";
// import Button from "../../dumbComponents/Button";
// import { createProject } from "../../store/slices/projectSlice";
// import {
//   projectDropdownDetails,
//   projectInputFieldDetails,
// } from "../../utils/constants";

// const CreateProject = () => {
//   const dispatch = useDispatch();
//   const [showForm, setShowForm] = useState(false);
//   const error = useSelector((state) => state.project.error);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const data = Object.fromEntries(formData.entries());
//     dispatch(createProject(data)).then(() => {
//       setShowForm(false);
//     });
//   };

//   return (
//     <div className="m-4">
//       <Button
//         btnText="Create Project"
//         handleClick={() => setShowForm(!showForm)}
//       />

//       {showForm && (
//         <form
//           className="space-y-4 border p-4 bg-gray-100 rounded-lg shadow-md"
//           onSubmit={handleSubmit}
//         >
//           <InputFields inputFieldDetails={projectInputFieldDetails} />
//           <Dropdowns dropdownDetails={projectDropdownDetails} />

//           {error && (
//             <p className="text-red-500 font-bold text-center">{error}</p>
//           )}

//           <Button type="submit" btnText="Create Project" />
//         </form>
//       )}
//     </div>
//   );
// };

// export default CreateProject;
