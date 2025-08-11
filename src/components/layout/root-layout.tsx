import { Outlet } from "react-router-dom";
import { AppHeader } from "./app-header";

export const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 px-4 py-8 container mx-auto">
        <Outlet />
      </main>
    </div>
  );
};
