import { Route, Routes, useNavigate } from "react-router-dom";
import { BaseLayout, UserContext } from "./components/layout/Base";
import { Main } from "./components/main/Main";
import "./App.css";
import Profile from "./components/profile/Profile";
import Active_workers from "./components/body/Active_workers";
import React, { useEffect, useState } from "react";
import Contact from "./components/body/Contact";
import AddUser from "./components/users/AddUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase";
import { findUserById } from "./lib/firebase/actions";
import Tasks from "./components/body/Tasks";
import Connection from "./components/auth/Connection";
import OrganizationList from "./components/management/organization-list/OrganizationList";
import Specializations from "./components/management/specializations/specializations";
import MailboxPage from "./components/mailbox/Mailbox";
import useFirebaseData from "./lib/firebase/useFirebaseData";
import ForgotPassword from "./components/auth/ForgotPassword";

export const AppRouter = () => {
  const [user, userLoading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(false);
  const userFirebaseData = useFirebaseData(user?.uid && "users/" + user.uid);

  useEffect(() => {
    // user UID that we are getting from firebase SDK
    const userUID = user?.uid;

    if (userUID) {
      // when we having the user UID,
      // we fetching to see his data from database
      findUserById(userUID, setUserData);
    }
  }, [user]);

  if (!user || !userData?.role) {
    // if ((!user && userLoading === false) || !userData?.role) {
    //   if (currentPath !== "/" && currentPath !== "/register") {
    //     return navigate("/");
    //   }

    return (
      <Routes>
        <Route path="/" element={<Connection user={user} />} />
        <Route path="/register" element={<Connection />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<Connection />} />
      </Routes>
    );
  }

  return (
    <UserContext.Provider value={userData}>
      <BaseLayout user={user}>
        <Routes>
          <Route path="/" element={<Tasks user={user} />} />
          <Route path="/tasks" element={<Tasks user={user} />} />
          <Route path="/workers" element={<Active_workers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/organizationWorkers" element={<OrganizationList />} />
          <Route path="/specializations" element={<Specializations />} />
          <Route
            path="/mailbox/:targetId"
            element={<MailboxPage pageSource="conversation" />}
          />
          <Route
            path="/mailbox"
            element={<MailboxPage pageSource="mainPage" />}
          />
        </Routes>
      </BaseLayout>
    </UserContext.Provider>
  );
};
