import type {
    BaseQueryFn
} from '@reduxjs/toolkit/query/react';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { BASE_URL, ERROR_STATUS } from "./constants/request";
import { showAlert } from './utils/showAlert'

interface AxiosBaseQueryArgs {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
}

// Define a base query type that will use Axios for fetching
export const axiosBaseQuery = (): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> => async ({ url, method, data, params }) => {
    try {
        // Perform the request using Axios
        const result = await axios({
            url: BASE_URL + url, method, data, params,
            paramsSerializer: params => {
                // Remove square brackets ([]) to the parameter name
                return Object.keys(params)
                    .map(key => {
                        if (Array.isArray(params[key])) {
                            return (params[key] as (string | number | boolean)[])
                                .map(value => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                                .join('&');
                        }
                        return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
                    })
                    .join('&');
            }
        });
        return { data: result.data };
    } catch (axiosError: any) {
        // Extract error info from Axios's error object
        if (axios.isAxiosError(axiosError)) {
            // let err = axiosError as AxiosError;
            const statusCode = axiosError.response?.status;
            if (statusCode === axios.HttpStatusCode.Forbidden) {
                showAlert("Permission denied.", "warning");
            } else if (statusCode && Object.prototype.hasOwnProperty.call(ERROR_STATUS, statusCode)) {
                showAlert(ERROR_STATUS[statusCode], "danger");
            } else if (statusCode === 400) {
                showAlert(axiosError.response?.data.detail, "danger");
            } else {
                showAlert(axiosError.response?.data.detail, "danger");
            }
        } else {
            showAlert("Send request failed.", "danger");
        }

        return {
            error: {
                status: axiosError.response?.status,
                data: axiosError.response?.data || axiosError.message,
            },
        };
    }
};