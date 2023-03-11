import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "./components/layout/Base";
import { Main } from "./components/main/Main";
import "./App.css";
import Profile from "./components/profile/Profile";

export const AppRouter = () => {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </BaseLayout>
  );
};
