import axios from "axios";

const axiosData = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json; Charset=utf-8",
    Accept: "*/*",
  },
});

function showNotification(
  message: string,
  type: "error" | "warning" | "info" = "error"
) {
  if (type === "error") {
    console.error(message);
  } else {
    console.warn(message);
  }
}

function handleError(error: any) {
  const status = error?.response?.status;
  const errorMessage = error?.response?.data?.message || error?.message;

  if (!error.response) {
    console.error("Network error:", error.message);
    showNotification("Network error. Please check your internet connection.");
  } else if (status === 401) {
    console.warn("Unauthorized.");
  } else if (status === 403) {
    showNotification("You don't have permission to perform this action.");
  } else if (status === 500) {
    showNotification("Server error. Please try again later.");
  } else if (status === 413) {
    showNotification("File size is too large. Please try again.");
  } else if (status === 404) {
    showNotification("Resource not found.");
  } else {
    showNotification(errorMessage || "System is busy. Please try again later.");
  }

  return Promise.reject(error);
}

axiosData.interceptors.response.use((response) => response, handleError);

export default axiosData;
