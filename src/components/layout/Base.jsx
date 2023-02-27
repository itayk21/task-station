import { Sidebar } from "./Sidebar/Sidebar";

export const BaseLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};
