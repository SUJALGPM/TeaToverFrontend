import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Sidebar from '../../components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { Divider, message } from 'antd';

const Entry = () => {

    //Handle the Manager IDs...
    const managerId = '65e3fba71170cbf53a35ea0a';

    //Render after working...
    const navigate = useNavigate();

    //Fetch the detail from params...
    const { yearName, monthName } = useParams();

    // Handle the state to store data...
    const [formData, setFormData] = useState({
        TeaVendorName: '',
        ChaiToldSold: '',
        ChaiPerPrice: '1',
        CoffeeToldSold: '',
        CoffeePerPrice: '1',
    });

    // Handle the form data....
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Handle the Entry Post api.....
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://teatover-backend.onrender.com/api/mgr/manager-record-entry/${managerId}/${yearName}/${monthName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    TeaVendorName: formData.TeaVendorName,
                    chaiTotalSold: formData.ChaiToldSold,
                    chaiPerPrice: formData.ChaiPerPrice,
                    coffeeTotalSold: formData.CoffeeToldSold,
                    coffeePerPrice: formData.CoffeePerPrice
                })
            });

            if (response.ok === true) {
                message.success("New Entry Recorded Successfully..");
                navigate('/mgr-year');
            } else {
                message.error("Failed to record the Entry...!!!");
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Generate options for dropdown from 1 to 20
    const options = [];
    for (let i = 1; i <= 20; i++) {
        options.push(<option key={i} value={i}>{i}</option>);
    }

    return (
        <Sidebar>
            <div className="Entry-container">
                <div className="Entry-box">
                    <h2 className='text-center'>Entry Record</h2>
                    <Divider style={{ borderColor: 'black' }} />
                    <Form onSubmit={handleSubmit} className='form-area'>
                        <FormGroup>
                            <table id="entryTable">
                                <tbody>
                                    <tr>
                                        <td>Venue</td>
                                        <td className='text-center'>Total Sold</td>
                                        <td className='text-center'>PPrice</td>
                                    </tr>
                                    <tr>
                                        <td>Chai</td>
                                        <td><Input type="text" name="ChaiToldSold" id="ChaiToldSold" placeholder="Enter Total Sold" value={formData.ChaiToldSold} onChange={handleChange} /></td>
                                        <td style={{ paddingLeft: "3px" }}>
                                            <Input type="select" name="ChaiPerPrice" id="ChaiPerPrice" value={formData.ChaiPerPrice} onChange={handleChange}>
                                                {[...Array(20)].map((_, index) => (
                                                    <option key={index} value={index + 1}>{index + 1}</option>
                                                ))}
                                            </Input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ paddingTop: "5px" }} >Coffee</td>
                                        <td style={{ paddingTop: "5px" }}><Input type="text" name="CoffeeToldSold" id="CoffeeToldSold" placeholder="Enter Total Sold" value={formData.CoffeeToldSold} onChange={handleChange} /></td>
                                        <td style={{ paddingLeft: "3px", paddingTop: "5px" }}>
                                            <Input type="select" name="CoffeePerPrice" id="CoffeePerPrice" value={formData.CoffeePerPrice} onChange={handleChange}>
                                                {[...Array(20)].map((_, index) => (
                                                    <option key={index} value={index + 1}>{index + 1}</option>
                                                ))}
                                            </Input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ paddingRight: '5px', paddingTop: '1px' }}>VName</td>
                                        <td colSpan="2" style={{ paddingTop: '5px' }}><Input type="text" name="TeaVendorName" id="TeaVendorName" placeholder="Enter TeaVendor Name" value={formData.TeaVendorName} onChange={handleChange} /></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            <Button color="warning" type="submit" className="custom-button">Record</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </Sidebar>
    )
}

export default Entry;
