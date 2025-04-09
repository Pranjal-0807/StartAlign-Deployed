import React, { useState } from "react";
import Dropdowns from "../../dumbComponents/Dropdowns";
import { useDispatch, useSelector } from "react-redux";
import InputFields from "../../dumbComponents/InputFields";
import Button from "../../dumbComponents/Button";
import { createProject } from "../../store/slices/projectSlice";
import {
  projectDropdownDetails,
  projectInputFieldDetails,
} from "../../utils/constants";

const CreateProject = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const error = useSelector((state) => state.project.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    dispatch(createProject(data)).then(() => {
      setShowForm(false);
    });
  };

  return (
    <div className="m-4">
      <Button
        btnText="Create Project"
        handleClick={() => setShowForm(!showForm)}
      />

      {showForm && (
        <form
          className="space-y-4 border p-4 bg-gray-100 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <InputFields inputFieldDetails={projectInputFieldDetails} />
          <Dropdowns dropdownDetails={projectDropdownDetails} />

          {error && (
            <p className="text-red-500 font-bold text-center">{error}</p>
          )}

          <Button type="submit" btnText="Create Project" />
        </form>
      )}
    </div>
  );
};

export default CreateProject;
