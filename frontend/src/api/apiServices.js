import axios from "axios";
import toast from "react-hot-toast";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  responseType: "json",
  withCredentials: true,
  maxRedirects: 2,
  transformRequest: function (data, headers) {
    if (!(data instanceof FormData)) return JSON.stringify(data);
    console.log(data, headers);
    headers["Content-Type"] = "multipart/form-data";
    return data;
  },
});

const requestInterceptor = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const responseInterceptor = (response) => {
  if (!response.data) return response;
  const customResponse = {
    success: true,
    data: response.data?.data || {},
    message: response.data?.message || "request was successful",
  };
  toast.success(customResponse.message);
  return customResponse;
};

const errorInterceptor = (error) => {
  const response = error.response || {};
  console.log(error);
  const customResponse = {
    success: false,
    data: response.data?.data || null,
    message: response.data?.message || "An error occurred",
  };
  toast.error(customResponse.message);
  return Promise.reject(customResponse);
};

instance.interceptors.response.use(responseInterceptor, errorInterceptor);

instance.interceptors.request.use(requestInterceptor);

const getRequest = async (endpoint, params = {}) => {
  try {
    const response = await instance.get(endpoint, { params });
    return response;
  } catch (error) {
    return error;
  }
};

const postRequest = async (endpoint, data) => {
  try {
    const response = await instance.post(endpoint, data);
    return response;
  } catch (error) {
    return error;
  }
};

const putRequest = async (endpoint, data) => {
  try {
    const response = await instance.put(endpoint, data);
    return response;
  } catch (error) {
    return error;
  }
};

const patchRequest = async (endpoint, data) => {
  try {
    const response = await instance.patch(endpoint, data);
    return response;
  } catch (error) {
    return error;
  }
};

const deleteRequest = async (endpoint, data) => {
  try {
    const response = await instance.delete(endpoint, { data });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export { postRequest, getRequest, putRequest, patchRequest, deleteRequest };
