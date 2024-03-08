import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Sidebar from '../../components/Sidebar';
import { Divider, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const NewBook = () => {

    //Handle the managerId to create new  year...
    const managerId = '65e3fba71170cbf53a35ea0a';

    //Render after work done..
    const navigate = useNavigate();

    //Store the data in state...
    const [formData, setFormData] = useState({
        newYearName: '',
    });

    //Handle the form data...
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://teatover-backend.onrender.com/api/mgr/manager-create-year/${managerId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    yearName: formData.newYearName
                })
            });

            if (response.ok === true) {
                message.success("New Year Create Successfully...");
                navigate("/mgr-year");
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
                    <h2 className='text-center'>Create New Year</h2>
                    <Divider style={{ borderColor: 'black' }} />
                    <Form onSubmit={handleSubmit} className='form-area'>
                        <FormGroup>
                            <Label for="id">Year Name :-</Label>
                            <Input type="text" name="newYearName" id="id" placeholder="Enter Year Name" value={formData.newYearName} onChange={handleChange} />
                        </FormGroup>
                        <div className="button-container">
                            <Button color="warning" type="submit" className="custom-button">Create Year</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </Sidebar>
    )
}

export default NewBook;
