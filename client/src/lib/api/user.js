import { apiClient } from ".";

export const sendSignInData = async (data) => {
  return await apiClient({
    method: "post",
    url: `/user/login`,
    data,
  })
};

export const sendSignUpData = async (formData, config) => {
  return await apiClient({
    method: "post",
    url: '/user/signUp',
    data: formData,
    headers: config
  })
};