import {
    FaUsers,
    FaTasks,
    FaChartBar,
    FaRocket,
} from "react-icons/fa";

import {
    Home,
    Settings,
    LogOut,
    Users,
    MessageCircle,
    Clipboard,
    ClipboardPlus,
    User,
    Files,
    Phone
} from "lucide-react";

export const projectInputFieldDetails = [
    {
        id: 1,
        type: "text",
        name: "title",
        label: "Title",
        placeholder: "Enter the title of your project",
    },
    {
        id: 2,
        type: "text",
        name: "description",
        label: "Description",
        placeholder: "Enter a description",
    },
    { id: 3, type: "date", name: "dueDate", label: "Due Date" },
];

export const projectDropdownDetails = [
    {
        id: 1,
        name: "priority",
        label: "Priority",
        options: ["Low", "Medium", "High"],
    },
    {
        id: 2,
        name: "status",
        label: "Status",
        options: ["Pending", "In Progress", "Completed"],
    },
];

export const subTaskInputFieldDetails = [
    {
        id: 1,
        type: "text",
        name: "subTaskName",
        label: "Sub Task Name",
        placeholder: "Sub Task Name",
    },
    {
        id: 2,
        type: "text",
        name: "assignedTo",
        label: "Assigned To",
        placeholder: "Assigned To",
    },
    {
        id: 3,
        type: "date",
        name: "deadline",
        label: "Deadline",
    },
];

export const subTaskDropdownDetails = [
    {
        id: 1,
        name: "status",
        label: "Status",
        options: ["In Progress", "Completed", "Pending"],
    },
];

export const signupFormData = [
    {
        id: 1,
        type: "text",
        name: "name",
        label: "Name",
        placeholder: "John Doe",
    },
    {
        id: 2,
        type: "email",
        name: "email",
        label: "Email",
        placeholder: "example@mail.com",
    },
    {
        id: 3,
        type: "password",
        name: "password",
        label: "Password",
        placeholder: "••••••••",
    },
    {
        id: 4,
        type: "password",
        name: "confirmPassword",
        label: "Confirm Password",
        placeholder: "••••••••",
    },
];

export const loginFormData = [
    {
        id: 1,
        type: "email",
        name: "email",
        label: "Email",
        placeholder: "example@mail.com",
    },
    {
        id: 2,
        type: "password",
        name: "password",
        label: "Password",
        placeholder: "••••••••",
    },
];

export const signupFormDropdownDetails = [
    {
        id: 1,
        name: "gender",
        label: "Gender",
        options: ["Male", "Female", "Other"],
    },
];

export const userTestimonials = [
    {
        name: "Alex Johnson",
        feedback:
            "StartAlign transformed how we work! The collaboration features are amazing!",
    },
    {
        name: "Samantha Lee",
        feedback:
            "Managing tasks has never been easier. Our team is more productive than ever!",
    },
    {
        name: "Michael Brown",
        feedback:
            "The real-time updates keep us aligned. Great for remote teams!",
    },
];

export const features = [
    {
        icon: FaUsers,
        title: "Team Collaboration",
        desc: "Communicate & manage work in one place.",
    },
    {
        icon: FaTasks,
        title: "Task Management",
        desc: "Organize tasks with drag-and-drop simplicity.",
    },
    {
        icon: FaChartBar,
        title: "Real-time Insights",
        desc: "Stay ahead with powerful analytics.",
    },
    {
        icon: FaRocket,
        title: "Boost Productivity",
        desc: "Automate workflows & focus on what matters.",
    },
];

export const sideBarIcons = [
    { id: 1, text: "Dashboard", path: "/dashboard", icon: Home },
    { id: 2, text: "Projects", path: "/projects", icon: Clipboard },
    { id: 3, text: "Team", path: "/team", icon: Users },
    {
        id: 4,
        text: "Create Project",
        path: "/create-project",
        icon: ClipboardPlus,
    },
    { id: 5, text: "Chat", path: "/chat", icon: MessageCircle },
    { id: 6, text: "Contact Us", path: "/contact-us", icon: Phone },
    { id: 7, text: "Profile", path: "/profile", icon: User },
    { id: 8, text: "Files", path: "/files", icon: Files },
    // { id: 9, text: "Settings", path: "/settings", icon: Settings },
    // { id: 10, text: "Logout", path: "/", icon: LogOut },
];
