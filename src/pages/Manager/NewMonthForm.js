import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { Divider, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";

const CreateMonth = () => {

    //Get the detail from params..
    const { mgrId, yearName } = useParams();

    //Render after work done..
    const navigate = useNavigate();

    //Store the data in state...
    const [formData, setFormData] = useState({
        newMonthName: '',
    });

    //Handle the form data...
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    //Send data to server...
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://teatover-backend.onrender.com/api/mgr/manager-create-month/${mgrId}/${yearName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    monthNAME: formData.newMonthName
                })
            });

            if (response.ok === true) {
                message.success("New Month Create Successfully...");
                navigate("/mgr-yearList");
            } else {
                message.error("Failed To Create New Year..!!!");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Sidebar>
            <div className="Year-container">
                <div className="login-box">
                    <h2 className='text-center'>Create New Month</h2>
                    <Divider style={{ borderColor: 'black' }} />
                    <Form onSubmit={handleSubmit} className='form-area'>
                        <FormGroup>
                            <Label for="id">Month Name :-</Label>
                            <Input type="text" name="newMonthName" id="id" placeholder="Enter Month Name" value={formData.newMonthName} onChange={handleChange} />
                        </FormGroup>
                        <div className="button-container">
                            <Button color="warning" type="submit" className="custom-button">Create Month</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </Sidebar>
    )
}

export default CreateMonth;
