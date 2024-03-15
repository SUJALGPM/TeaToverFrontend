import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap'; // Import Table component from reactstrap
import Sidebar from '../../components/Sidebar';

const Expenses = () => {
    const [expensesData, setExpensesData] = useState([]);

    //Fetch the reponse....
    useEffect(() => {
        // Fetch expenses data from the API
        const fetchExpensesData = async () => {
            try {
                const response = await fetch('https://teatover-backend.onrender.com/api/mgr/manager-expenses-detail/65e3fba71170cbf53a35ea0a');
                if (!response.ok) {
                    throw new Error('Failed to fetch expenses');
                }
                const data = await response.json();
                setExpensesData(data);
            } catch (error) {
                console.error('Failed to fetch expenses:', error);
            }
        };

        fetchExpensesData();
    }, []);



    return (
        <Sidebar>
            <div>
                <h2>Expenses report</h2>
                <Table bordered responsive hover>
                    <thead>
                        <tr className="table-info">
                            <th>Year</th>
                            <th>Month</th>
                            <th>Invoice</th>
                            <th>Total Sale</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expensesData.map((item, index) => (
                            <tr key={index}>
                                <td style={{ padding: "13px", textAlign: "center" }}>{item.YNAME}</td>
                                <td style={{ padding: "13px", textAlign: "center" }}>{item.MNAME}</td>
                                <td style={{ padding: "13px", textAlign: "center" }}>{item.TINVOICE}</td>
                                <td style={{ padding: "13px", textAlign: "center" }}>{item.TSALEDAYS}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Sidebar>
    );
};

export default Expenses;
