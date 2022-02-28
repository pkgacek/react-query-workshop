import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { CACHE_KEYS, API } from '../api';
import { EmployeeForm } from '.';

const EmployeeDetails = ({ employeeId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const queryConfig = {
        retry: false,
        enabled: Boolean(employeeId),
    };

    const {
        data, isLoading, isError, isSuccess, error: _error,
    } = useQuery(
        [CACHE_KEYS.EMPLOYEE, employeeId],
        () => API.getEmployee(employeeId),
        queryConfig,
    );

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div>
            {isLoading && (
            // isLoading informs about pending request.
                <React.Fragment>
                    <h1>Loading employee</h1>
                    <p>Loading...</p>
                </React.Fragment>
            )}
            {isError && (
            // isError informs about failed request.
                <React.Fragment>
                    <h1>Error while fetching employee</h1>
                    <p>See logs for more details</p>
                </React.Fragment>
            )}
            {isSuccess && (
                // isSuccess informs about succeeded request.
                <React.Fragment>
                    {/* isFetching informs about background fetching */}
                    <button
                        type="button"
                        onClick={handleEdit}
                    >
                        {isEditing ? 'close' : 'edit'}
                    </button>
                    {isEditing ? (
                        <EmployeeForm employee={data} setIsEditing={handleEdit} />

                    ) : (
                        <React.Fragment>
                            <h1>{data.employee_name}</h1>
                            <p>{data.employee_age}</p>
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default EmployeeDetails;
