import React from 'react';
import { useQuery } from 'react-query';
import * as API from './employeeApi';

const EMPLOYEE_DETAILS_CACHE_KEY = 'employee_details';

const EmployeeDetails = ({ employeeId }) => {
    const {
        data, isLoading, isError, isSuccess, isFetching, error: _error,
    } = useQuery(
        [EMPLOYEE_DETAILS_CACHE_KEY, employeeId],
        () => API.getEmployee(employeeId),
        {
            retry: false,
            enabled: Boolean(employeeId),
        },
    );

    return (
        <div>
            {isLoading && (
                <React.Fragment>
                    <h1>Loading employee</h1>
                    <p>Loading...</p>
                </React.Fragment>
            )}
            {isError && (
                <React.Fragment>
                    <h1>Error while fetching employee</h1>
                    <p>See logs for more details</p>
                </React.Fragment>
            )}
            {isSuccess && (
                <React.Fragment>
                    {isFetching && (<p>Fetching...</p>)}
                    <h1>{data.employee_name}</h1>
                    <p>{data.employee_age}</p>
                </React.Fragment>
            )}
        </div>
    );
};

export default EmployeeDetails;
