import axios from 'axios';

const URL = 'http://dummy.restapiexample.com/api/v1';
const api = axios.create({
    baseURL: URL,
});

export const getEmployeeList = async () => {
    const response = await api.get('/employees');

    // this mock api returns `data` object.
    return response.data.data;
};

export const createEmployee = async (createdEmployee) => {
    const response = await api.post('/create', createdEmployee);

    return response.data.data;
};

export const getEmployee = async (id) => {
    const response = await api.get(`/employee/${id}`);

    return response.data.data;
};

export const updateEmployee = async ({ id, ...updatedEmployee }) => {
    const response = await api.put(`/update/${id}`, updatedEmployee);

    return response.data.data;
};

export const deleteEmployee = async (id) => {
    const response = await api.delete(`/delete/${id}`);

    return response.data.data;
};
