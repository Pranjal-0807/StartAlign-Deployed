import React from "react";
import { Plus, X } from "lucide-react";
import { useDispatch } from "react-redux";
import Button from "../../dumbComponents/Button";
import Dropdowns from "../../dumbComponents/Dropdowns";
import InputFields from "../../dumbComponents/InputFields";
import { createSubTask } from "../../store/slices/subTaskSlice";
import {
  subTaskDropdownDetails,
  subTaskInputFieldDetails,
} from "../../utils/constants";

const CreateSubTask = ({ projectId }) => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    dispatch(createSubTask({ ...data, projectId })).then(() => {
      setShowForm(false);
    });
  };

  return (
    <div>
      <Button
        btnText={showForm ? <X /> : <Plus />}
        handleClick={() => setShowForm(!showForm)}
        cssClass={`${
          showForm ? "bg-red-500" : "bg-green-500"
        } text-white p-2 rounded-full cursor-pointer`}
      />

      {showForm && (
        <form
          className="space-y-4 border p-4 bg-gray-100 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <InputFields inputFieldDetails={subTaskInputFieldDetails} />
          <Dropdowns dropdownDetails={subTaskDropdownDetails} />

          {/* {error && (
            <p className="text-red-500 font-bold text-center">{error}</p>
          )} */}

          <Button type="submit" btnText="Create Sub Task" />
        </form>
      )}
    </div>
  );
};

export default CreateSubTask;
