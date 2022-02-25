import React, { useState } from 'react';
import { EmployeeDetails, Employees } from 'components';
import { EmployeeEmpty } from 'elements';
import './App.css';

const App = () => {
    const [employeeId, setEmployeeId] = useState('');

    const handleSetEmployeeId = (id) => {
        setEmployeeId(id);
    };

    return (
        <div className="App">
            <div className="App-header" style={{ display: 'flex' }}>
                <div style={{
                    padding: 20,
                    width: '40%',
                    borderRight: '2px solid white',
                }}
                >
                    <Employees setEmployeeId={handleSetEmployeeId} />
                </div>
                <div style={{
                    padding: 20,
                    width: '60%',
                }}
                >
                    {!employeeId ? (
                        <EmployeeEmpty />
                    ) : (
                        <EmployeeDetails employeeId={employeeId} />
                    )}
                </div>

            </div>
        </div>
    );
};

export default App;
