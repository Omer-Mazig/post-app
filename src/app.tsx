import { Toaster } from "sonner";
import { router } from "./lib/router";
import { RouterProvider } from "react-router-dom";

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};
