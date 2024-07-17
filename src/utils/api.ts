import axios, { AxiosError } from 'axios';
import { ApiError } from 'src/models/Api';

const BASE_URL = 'http://localhost:8000/api/v1';

export const useApi = async <TypeDataResponse>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: object,
  withAuth: boolean = true
): Promise<{
  data?: TypeDataResponse;
  detail: string;
}> => {
  try {
    const request = await axios(`${BASE_URL}/${endpoint}`, {
      method,
      data: method != 'GET' && data,
      params: method == 'GET' && data
    });

    return {
      data: request.data,
      detail: ''
    };
  } catch (e) {
    const error = e as AxiosError<ApiError>;

    return {
      data: null,
      detail: error.response.data.detail || error.message
    };
  }
};
