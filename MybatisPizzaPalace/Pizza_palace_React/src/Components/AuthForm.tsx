import axios, { AxiosError } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { ctx } from '../Utils/FetchData';
import { User } from '../Utils/DataTypes';
import { useNavigate } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';


interface FormData {
  firstName: string | null,
  lastName: string | null,
  address: string | null,
  phoneNumber: string | null,
  emailAddress: string | null,
  password: string | null,
}

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const appContext = useContext(ctx);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState<string | null>(null);
  const [signUpData, setSignUpData] = useState<FormData>({
    firstName: null,
    lastName: null,
    address: null,
    phoneNumber: null,
    emailAddress: null,
    password: null,
  })


  const handleData = (e) => {
    e.preventDefault();
    setSignUpData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleToggle = () => setIsLogin(!isLogin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const formData = {
        userId: email,
        password: password
      }

      const fun = async () => {
        try {
          let res = await axios.post("http://localhost:8080/auth", formData)
          
          let data = {
            address: "",
            id: 0,
            type: "user"
          };


          const [first, second] = res.data.data;
          if (first.hasOwnProperty("address")) {
            data.address = first.address;
            data.id = first.customerId;
           
            data.type = second.adminUser === false ? "user" : "admin";
          } else {
            data.address = second.address;
            data.id = second.customerId;
            data.type = first.adminUser === false ? "user" : "admin";
          }

          appContext.setUser(data);
          sessionStorage.setItem("auth",JSON.stringify(data));

          navigate("/");

        } catch (err) {
          console.log(err);
          setMessage("invalid credentials");

        }

      }
      fun();


    } else {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (signUpData.emailAddress && !emailRegex.test(signUpData.emailAddress)) {
        setMessage("Please enter a valid email address");
      }else if (!signUpData.firstName?.trim() || !signUpData.lastName?.trim()) {
        setMessage("Name can't be empty");
      } else if (!signUpData.address?.trim()) {
        setMessage("Address can't be empty");
      } else if (!signUpData.phoneNumber || signUpData.phoneNumber.toString().length !== 10) {
        setMessage("Please enter a 10-digit phone number");
      }else if (!signUpData.emailAddress?.trim()) {
        setMessage("Email can't be empty");
      }else if (!signUpData.password || signUpData.password.length < 10) {
        setMessage("Please enter a password with at least 10 characters");
      } else {
        // proceed with sign-up
        
    
        console.log(signUpData)
        const uploadData = async () => {
          try {
            const res = await axios.post(`http://localhost:8080/customers?password=${encodeURIComponent(signUpData.password || "1")}`, signUpData);
            const data: User = {
              address: res.data.data.customer[0].address,
              id: res.data.data.customer[0].customerId,
              type: "user"
            }
            appContext.setUser(data);
            sessionStorage.setItem("auth",JSON.stringify(data));
            navigate("/");
          } catch (err:any) {
            console.log(err);
            setMessage(err.response.data.error.message);
          }
        }
        uploadData();
      }
    }

  
    setEmail('');
    setPassword('');

  };


  useEffect(() => {
    console.log(appContext.user);
  }, [appContext.user])


  return (
    <Container className="d-flex py-0 justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <h3 className="text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h3>
        <Form onSubmit={handleSubmit}>
          {message != null &&
            <Alert variant="danger" className="w-100 py-2 d-flex justify-content-between  m-0" onClose={() => { setMessage(null) }}>
              <span className="fs-6 mt-1 ms-2">{message}</span>
              <IoIosClose onClick={() => { setMessage(null) }} className="fs-1 text-danger  shadow border rounded" style={{ cursor: "pointer" }} />
            </Alert>
          }
          {!isLogin ? (
            <>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  name="firstName"
                  value={signUpData.firstName || ""}
                  onChange={handleData}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  name="lastName"
                  value={signUpData.lastName || ""}
                  onChange={handleData}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  value={signUpData.address || ""}
                  onChange={handleData}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your phone number"
                  name="phoneNumber"
                  value={signUpData.phoneNumber || ""}
                  onChange={handleData}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="emailAddress"
                  value={signUpData.emailAddress || ""}
                  onChange={handleData}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={signUpData.password || ""}
                  onChange={handleData}
                  required
                />
              </Form.Group>

              <Button variant="danger" onClick={handleSubmit} type="submit" className="w-100">
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
            </>
          ) :
            <>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="danger" type="submit" className="w-100">
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>

            </>

          }


        </Form>

        <div className="text-center mt-3">
          <small>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span
              onClick={handleToggle}
              className="text-primary"
              style={{ cursor: 'pointer' }}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </small>
        </div>
      </Card>
    </Container>
  );
};

export default AuthForm;
