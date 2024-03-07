import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Login = () => {

    const [formData, setFormData] = useState({
        managerId: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        console.log('ID:', formData.managerId);
        console.log('Password:', formData.password);
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className='text-center'>Login Page</h2>
                <Form onSubmit={handleSubmit} className='form-area'>
                    <FormGroup>
                        <Label for="id">ManagerID :-</Label>
                        <Input type="text" name="managerId" id="id" placeholder="Enter your ID" value={formData.managerId} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password :-</Label>
                        <Input type="password" name="password" id="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                    </FormGroup>
                    <div className="button-container">
                        <Button color="warning" type="submit" className="custom-button">Login</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login;
