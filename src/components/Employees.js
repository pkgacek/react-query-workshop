import React from 'react';
import { useQuery } from 'react-query';
import { API, CACHE_KEYS } from '../api';
import { EmployeeCard } from '../elements';

const Employees = ({ setEmployeeId }) => {
    const queryConfig = {
        retry: false,
    };
    // Pass queryFn as a arrow function to invoke it only once.
    const {
        data, isLoading, isError, isSuccess, error: _error,
    } = useQuery(
        CACHE_KEYS.EMPLOYEES,
        () => API.getEmployeeList(),
        queryConfig,
    );

    return (
        <div>

            <ul>
                {isLoading && (
                // isLoading informs about pending request.
                    <li>Loading employees...</li>
                )}
                {isError && (
                // isError informs about failed request.
                    <li>There was an error.</li>
                )}
                {isSuccess && data && (
                // isSuccess informs about succeeded request.
                    data.map((employee) => (
                        <EmployeeCard
                            key={employee.id}
                            employee={employee}
                            setEmployeeId={setEmployeeId}
                        />
                    ))
                )}
            </ul>
        </div>
    );
};

export default Employees;
