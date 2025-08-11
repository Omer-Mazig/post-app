import HomePage from "@/pages/home-page";
import { createBrowserRouter } from "react-router-dom";

/**
 * Router
 * @description Router for the application
 * @returns {BrowserRouterProvider} Router provider
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
