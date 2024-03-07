import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router';

const Year = () => {

    //Handle the Manager IDs...
    const managerId = '65e3fba71170cbf53a35ea0a';
    const navigate = useNavigate();

    //After fetching store data...
    const [yearData, setYearData] = useState([]);

    //Fetch the year wise data from API..
    useEffect(() => {
        const fetchDataYear = async () => {
            try {
                const yearDetail = await fetch(`https://teatover-backend.onrender.com/api/mgr/manager-years-detail/${managerId}`);
                const formatData = await yearDetail.json();
                setYearData(formatData.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchDataYear();
    }, []);

    //Handle the yearIds and pass to next page...
    const handleYearId = (yearObjId, yearName) => {
        console.log('handleYearId', yearObjId);
        navigate(`/mgr-month/${yearObjId}/${yearName}`);
    }


    return (
        <div>
            <Sidebar>
                <h3>Year Page</h3>
                {yearData.map(year => (
                    <Card key={year.yearObjId} style={{ marginLeft: '10px', marginRight: '10px', marginBottom: "10px", width: "310px", height: "200px" }} onClick={() => handleYearId(year.yearObjId, year.yearName)}>
                        <CardBody>
                            <CardTitle className='text-center'>YearName :{year.yearName}</CardTitle>
                            <CardText>TotalMonth :{year.totalMonth}</CardText>
                            <CardText>TotalService :{year.totalDays}</CardText>
                            <CardText>TotalInvoice :{year.totalInvoice}</CardText>
                            <CardText>TotalTeaVendors :{year.totalTeaVendors}</CardText>
                        </CardBody>
                    </Card>
                ))}
            </Sidebar>
        </div>
    )
}

export default Year;


