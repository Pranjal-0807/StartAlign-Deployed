import axios from "axios";
import React, { useEffect } from "react";
import Home from "./components/Home/Home";
import Team from "./components/Team/Team";
// import Loader from "./dumbComponents/Loader";
import ChatApp from "./components/Chat/ChatApp";
import Profile from "./components/Profile/Profile";
import Account from "./components/Account/Account";
import Auth from "./components/SecureRouting/Auth";
import Project from "./components/Project/Project";
import Projects from "./components/Project/Projects";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./store/slices/usersSlice";
import DashBoard from "./components/DashBoard/DashBoard";
import ShowFiles from "./components/FileUpload/ShowFiles";
import ContactUs from "./components/ContactUs/ContactUs";
import { fetchProjects } from "./store/slices/projectSlice";
import CreateProject from "./components/Project/CreateProject";
import { setUser, setLoading, setError } from "./store/slices/authSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectForm from "./components/Project/ProjectForm";

const App = () => {
  const dispatch = useDispatch();
  const authURL = import.meta.env.VITE_BASE_URL_AUTH_SERVER;
  const user = useSelector((state) => state.auth.user);

  // const loading = useSelector((state) => state.project.loading);

  useEffect(() => {
    dispatch(setLoading(true));
    const refreshToken = localStorage.getItem("refreshToken");
    axios
      .post(`${authURL}/auth/user`, { token: refreshToken })
      .then((response) => dispatch(setUser(response?.data?.user)))
      .catch((error) => dispatch(setError(error?.response?.data?.message)))
      .finally(() => dispatch(setLoading(false)));
  }, []);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, user]);

  return (
    <>
      {/* {loading && <Loader />} */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<h1>Not found</h1>} />
          <Route element={<Auth />}>
            <Route path="/team" element={<Team />} />
            <Route path="/chat" element={<ChatApp />} />
            <Route path="/files" element={<ShowFiles />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/dashboard" element={<DashBoard />} />
            {/* <Route path="/settings" element={<h1>Settings</h1>} /> */}
            <Route path="/contact-us" element={<ContactUs/>} />
            <Route path="/projects/:projectId" element={<Project />} />
            <Route path="/create-project" element={<ProjectForm />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
