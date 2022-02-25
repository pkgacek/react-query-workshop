import React from 'react';

const EmployeeCard = ({ employee, setEmployeeId }) => (
    <li key={employee.id}>
        {employee.employee_name}
        {' '}
        <button
            type="button"
            onClick={() => setEmployeeId(employee.id)}
        >
            {' '}
            View
            {' '}
        </button>
    </li>
);

export default EmployeeCard;
