import React, { useState } from 'react';
import './App.css';
import EmployeeDetails from './EmployeeDetails';
import EmployeeEmpty from './EmployeeEmpty';
import Employees from './Employees';

const App = () => {
    const [employeeId, setEmployeeId] = useState('');

    return (
        <div className="App">
            <div className="App-header" style={{ display: 'flex' }}>
                <div style={{
                    padding: 20,
                    width: '40%',
                    borderRight: '2px solid white',
                }}
                >
                    <Employees setEmployeeId={setEmployeeId} />
                </div>
                <div style={{
                    padding: 20,
                    width: '60%',
                }}
                >
                    {!employeeId && <EmployeeEmpty />}
                    {employeeId && <EmployeeDetails employeeId={employeeId} />}
                </div>

            </div>
        </div>
    );
};

export default App;
