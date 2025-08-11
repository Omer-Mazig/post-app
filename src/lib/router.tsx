import { RootLayout } from "@/components/layout/root-layout";
import { PostDetailsPage } from "@/features/posts/pages/post-details-page";
import { PostsFeedPage } from "@/features/posts/pages/posts-feed-page";
import { createBrowserRouter, Navigate } from "react-router-dom";

/**
 * Router
 * @description Router for the application
 * @returns {BrowserRouterProvider} Router provider
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        // For now, redirect to /feed on root path
        // If we decide to have a home page, we can change this to /
        index: true,
        element: (
          <Navigate
            to="/feed"
            replace
          />
        ),
      },
      {
        path: "/feed",
        element: <PostsFeedPage />,
      },
      {
        path: "/posts/:id",
        element: <PostDetailsPage />,
      },
    ],
  },
]);
