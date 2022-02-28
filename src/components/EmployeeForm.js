import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { API, CACHE_KEYS } from '../api';

const EmployeeForm = ({ employee, setIsEditing }) => {
    const [formData, setFormData] = useState({ ...employee });

    const queryClient = useQueryClient();

    const { isLoading, isError, mutate } = useMutation(API.updateEmployee, {
        onMutate: async (updateData) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries([CACHE_KEYS.EMPLOYEE, employee.id]);

            // Snapshot the previous value
            const previousData = queryClient.getQueryData([CACHE_KEYS.EMPLOYEE, employee.id]);

            // Optimistically update to the new value
            queryClient.setQueryData([CACHE_KEYS.EMPLOYEE, employee.id], updateData);

            // Return a context object with the snapshotted value
            return { previousData };
        },
        onError: (err, _updatedData, context) => {
            // If error, revert data
            queryClient.setQueryData([CACHE_KEYS.EMPLOYEE, employee.id], context.previousData);
        },
        onSettled: () => {
            // update other queries
            queryClient.invalidateQueries(CACHE_KEYS.EMPLOYEES);
            setIsEditing(false);
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData);
    };

    return (
        <div>
            {isError && (
                <p>Unexpected error!</p>
            )}
            {isLoading && (
                <p>Saving changes...</p>
            )}
            <form onSubmit={handleSubmit}>
                <div style={{ marginTop: 20 }}>
                    <label htmlFor="employee_name">
                        <p>Employee name</p>
                        <input
                            id="employee_name"
                            name="employee_name"
                            type="text"
                            value={formData.employee_name}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div style={{ marginTop: 20 }}>
                    <label htmlFor="employee_age">
                        <p>Employee age</p>
                        <input
                            id="employeeagee"
                            name="employee_age"
                            type="text"
                            value={formData.employee_age}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div style={{ marginTop: 20 }}>
                    <button type="submit">Submit</button>
                </div>
            </form>

        </div>
    );
};

export default EmployeeForm;
