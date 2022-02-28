import axios from 'axios';

// mock example api
const URL = 'http://localhost:4000';
const api = axios.create({
    baseURL: URL,
});

export const getEmployeeList = async () => {
    const response = await api.get('/employees');

    // this mock api returns `data` object.
    return response.data;
};

export const createEmployee = async (createdEmployee) => {
    const response = await api.post('/create', createdEmployee);

    return response.data.data;
};

export const getEmployee = async (id) => {
    const response = await api.get(`/employees/${id}`);

    return response.data;
};

export const updateEmployee = async ({ id, ...updatedEmployee }) => {
    if (updatedEmployee.employee_name === 'Error') {
        throw new Error('Throw error');
    }
    const response = await api.put(`/employees/${id}`, updatedEmployee);

    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await api.delete(`/delete/${id}`);

    return response.data.data;
};
