export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const ERROR_STATUS: { [key: string]: string; } = {
    403: "Permission denied",
    404: "Not found",
    405: "Method is not allowed",
    422: "Validation Error",
    500: "Server error",
    504: "Request timed out. Please try again.",
};

export const ERROR_MESSAGE = {};