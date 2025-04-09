import React from 'react'
import { X } from "lucide-react";
import Button from "../../dumbComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import Dropdowns from "../../dumbComponents/Dropdowns";
import InputFields from "../../dumbComponents/InputFields";
import { createProject } from "../../store/slices/projectSlice";
import {
    projectDropdownDetails,
    projectInputFieldDetails,
} from "../../utils/constants";

const ProjectForm = ({ setShowForm }) => {
    const dispatch = useDispatch();
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
        <div className='flex justify-center items-center'>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit}
                >
                    <InputFields inputFieldDetails={projectInputFieldDetails} />
                    <Dropdowns dropdownDetails={projectDropdownDetails} />

                    {error && (
                        <p className="text-red-500 font-bold text-center">{error}</p>
                    )}

                    <div className="flex justify-between">
                        <Button type="submit" btnText="Create Project" />
                        <Button
                            btnText={<X className="w-6 h-6" />}
                            handleClick={() => setShowForm(false)}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProjectForm
