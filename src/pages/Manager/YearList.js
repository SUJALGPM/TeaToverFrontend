import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


const NewMonth = () => {

    //Get the manager Ids from localstorage..
    const managerIds = '65e3fba71170cbf53a35ea0a';

    //State to store the fetch data..
    const [yearName, setYearName] = useState([]);

    //Travel to next page with data...
    const navigate = useNavigate();

    //Handle the Get Api...
    useEffect(() => {
        const fetchYearName = async () => {
            try {
                const response = await fetch('https://teatover-backend.onrender.com/api/yrs/get-total-years');
                const formatedResponse = await response.json();
                console.log(formatedResponse.years)
                setYearName(formatedResponse.years);
            } catch (err) {
                console.log(err);
            }
        }

        fetchYearName();
    }, []);

    //Handle the YearName to create a new month...
    const handleYearName = (YearWiseName, _id) => {
        navigate(`/mgr-createMonth/${managerIds}/${YearWiseName}`);
    }



    return (
        <Sidebar>
            <div>
                <h3>Create New Month</h3>

                {yearName.map(year => (
                    <Card key={year._id} style={{ marginLeft: '10px', marginRight: '10px', marginBottom: "10px", width: "310px", height: "150px" }} onClick={() => handleYearName(year.YearWiseName, year._id)} outline color='black'>
                        <CardBody>
                            <CardTitle className='text-center'>YEARNAME :{year.YearWiseName}</CardTitle>
                            <CardTitle className='text-center'>TotalMonth :{year.TotalMonth.length}</CardTitle>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </Sidebar>
    )
}

export default NewMonth;
