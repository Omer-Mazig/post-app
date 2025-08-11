import axios from "axios";

/**
 * API client
 * @description API client for the application
 * @returns {AxiosInstance} API client
 */

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global error logger for development
if (import.meta.env.DEV) {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // For development, log the error
      if (import.meta.env.DEV) {
        console.error("API Error:", error);
      }
      return Promise.reject(error);
    }
  );
}
