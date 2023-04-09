import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "./components/layout/Base";
import { Main } from "./components/main/Main";
import "./App.css";
import Profile from "./components/profile/Profile";
import Active_workers from "./components/body/Active_workers";
import React from "react";
import Contact from "./components/body/Contact";
import AddUser from "./components/users/AddUser";
import Management from "./components/management/Management";

export const AppRouter = () => {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/workers" element={<Active_workers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/management" element={<Management />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </BaseLayout>
  );
};
