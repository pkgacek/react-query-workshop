import React from 'react';
import { useQuery } from 'react-query';
import * as API from './employeeApi';
import EmployeeCard from './EmployeeCard';

const EMPLOYEES_CACHE_KEY = 'employees';

const Employees = ({ setEmployeeId }) => {
    const {
        data, isLoading, isError, isSuccess, error: _error,
    } = useQuery(EMPLOYEES_CACHE_KEY, API.getEmployeeList, { retry: false });

    return (
        <div>

            <ul>
                {isLoading && (
                    <li>Loading employees...</li>
                )}
                {isError && (
                    <li>
                        There was an error.
                    </li>
                )}
                {isSuccess && (
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
