import React,{ useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from 'react-bootstrap/Nav';
import { NavLink,useNavigate } from 'react-router-dom';



export const AdminLogin = () => {
  const history = useNavigate();
  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    date: "",
    password: ""
})



const [data] = useState([]);
console.log(inpval);

const getdata = (e) => {
    // console.log(e.target.value);


    const { value, name } = e.target;
    // console.log(value,name);


    setInpval(() => {
        return {
            ...inpval,
            [name]: value
        }
    })

}

const addData = (e) => {
    e.preventDefault();

    const { name, email, date, password } = inpval;

    if (name === "") {
        toast.error(' name field is requred!',{
            position: "top-center",
        });
    } else if (email === "") {
         toast.error('email field is requred',{
            position: "top-center",
        });
    } else if (!email.includes("@")) {
         toast.error('plz enter valid email addres',{
            position: "top-center",
        });
    } else if (date === "") {
         toast.error('date field is requred',{
            position: "top-center",
        });
    } else if (password === "") {
         toast.error('password field is requred',{
            position: "top-center",
        });
    } else if (password.length < 5) {
         toast.error('password length greater five',{
            position: "top-center",
        });
    } else {
        console.log("data added succesfully");
        history("/addtoll")
        localStorage.setItem("useryoutube",JSON.stringify([...data,inpval]));

    }

}
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink to="/about" className="text-decoration-none text-light mx-2">About</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/" className="text-decoration-none text-light mx-2">Home</NavLink>
                        
                    </Nav>
                </Container>
            </Navbar>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Sign Up</h3>
                        <Form >
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="text" name='name' onChange={getdata} placeholder="Enter Your Name" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control onChange={getdata} name='date' type="date" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" pattern="`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`" />
                            </Form.Group>
                            <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "rgb(67, 185, 127)" }} type="submit">
                                Submit
                            </Button>
                        </Form> 
                    </div>
                </section>
                <ToastContainer />
            </div>
        </>
    )
}

