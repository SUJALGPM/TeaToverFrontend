import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import { useParams, useNavigate } from 'react-router';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';


const Month = () => {

    //Fetch Year Ids from Params...
    const { yearId, yearName } = useParams();

    //After working navigate...
    const navigate = useNavigate();

    //Store the fetch response..
    const [monthDetail, setMonthDetail] = useState([]);

    //Handle the month data api response.....
    useEffect(() => {
        const fetchDataMonth = async () => {
            const response = await fetch(`https://teatover-backend.onrender.com/api/mgr/manager-month-detail/${yearId}`);
            const formatData = await response.json();
            console.log("Detail :", formatData.data);
            setMonthDetail(formatData.data);
        }

        fetchDataMonth();
    }, []);


    //Handle the month ID for next Entry page...
    const handleMonthId = (monthObjId, monthName) => {
        navigate(`/mgr-entry/${yearName}/${monthName}`);
    }



    return (
        <div>
            <Sidebar>
                <h3>Month Page</h3>
                {monthDetail.map(month => (
                    <Card key={month.monthObjId} style={{ marginLeft: '10px', marginRight: '10px', marginBottom: "10px", width: "310px", height: "200px" }} onClick={() => handleMonthId(month.monthObjId, month.monthName)}>
                        <CardBody>
                            <CardTitle className='text-center'>YearName :{month.monthName}</CardTitle>
                            <CardText>TotalService :{month.totalDays}</CardText>
                            <CardText>TotalTeaVendors :{month.totalTeaVendors}</CardText>
                            <CardText>MonthInvoice :{month.totalInvoice}</CardText>
                        </CardBody>
                    </Card>
                ))}
            </Sidebar>
        </div>
    )
}

export default Month;
