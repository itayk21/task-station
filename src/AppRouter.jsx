import App from "./App";
import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "./components/layout/Base";

export const AppRouter = () => {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BaseLayout>
  );
};
