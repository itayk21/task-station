import App from "./App";
import { Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  );
};
