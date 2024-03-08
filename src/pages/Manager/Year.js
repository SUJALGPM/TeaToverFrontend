import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import Sidebar from '../../components/Sidebar';
import { FaPlus } from 'react-icons/fa';
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

    //Handle the new year create..
    const handleNewYear = () => {
        navigate('/mgr-newYear');
    }

    return (
        <div>
            <Sidebar>
                <h3>Year Page</h3>

                {/* Button To create New Yearr */}
                <Button color='info' style={{ marginLeft: "200px", marginBottom: "10px", border: "1px solid black", marginRight: "5px" }} onClick={handleNewYear}>
                    <FaPlus style={{ marginRight: "5px" }} />
                    NewYear
                </Button>

                {/* YearWise Card  */}
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


