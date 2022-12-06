import axios from "axios";
import { useState } from "react";
import ButtonAction from "./ButtonAction";
import AlertAction from "./AlertAction";
import bcrypt from "bcryptjs"
import { useNavigate } from "react-router-dom";
import LogoTW from '../assets/twitter-logo-dark.png'
import { Link } from "react-router-dom";

let url;
process.env.NODE_ENV == 'development' ? 
    url = process.env.REACT_APP_DEV_API_URL
    :
    url = process.env.REACT_APP_API_URL

const rootUrl = `${url}users`
const rootUrlTwittiw = "http://localhost:8080/api/";
// PASSWORD = admin123

const FormLogin = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const handleChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    const [showAlertEmail, setshowAlertEmail] = useState(false);
    let alertEmail;
    if (showAlertEmail) {
        alertEmail = <AlertAction variant={'danger'} message={'Email Not Found'} onClose={() => setshowAlertEmail(false)} />
    }
    const [showAlertPassword, setshowAlertPassword] = useState(false);
    let alertPassword;
    if (showAlertPassword) {
        alertPassword = <AlertAction variant={'danger'} message={'Wrong Password'} onClose={() => setshowAlertPassword(false)} />
    }
    const getUsers = async () => {
        console.log(rootUrl)
        const checkEmail = await axios.get(`${rootUrl}?email=${form.email}`);
        if (checkEmail.data.length > 0) {
            const checkPassword = bcrypt.compareSync(form.password, checkEmail.data[0].password)
            if (checkPassword) {
                sessionStorage.setItem('data_user', JSON.stringify(checkEmail.data[0]));
                // console.log(JSON.stringify(checkEmail.data[0]));
                navigate('/');
            } else {
                setshowAlertPassword(true)
            }
            setForm({ email: '', password: '' });
        } else {
            setshowAlertEmail(true);
            setForm({ email: '', password: '' });
        }
    }

    const login = async () => {
        try {
            const res = await axios.post(`${rootUrlTwittiw}/login`, form)
            // console.log(res.data.user)
            // console.log(res.status)
            if(res.status === 200){
                sessionStorage.setItem('data_user', JSON.stringify(res.data.user));
                navigate('/');
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleLogin = event => {
        event.preventDefault();
        login()
        // getUsers();
    }

    return (
        <section className="register-form">
            <section className="logo mx-auto my-3">
                <img src={LogoTW} alt="twitter logo" />
            </section>
            <h2 className="text-center">Log in to Twitter</h2>
            {alertEmail}
            {alertPassword}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Enter Email" name="email" value={form.email} onChange={handleChange} required />
                <input type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} required />
                <button className='btn-tw mt-2'>Login</button>
                <p className="mt-3">Don't have account? <Link to={'/register'}>Sign Up</Link></p>
            </form>
        </section>
        // <Container className='w-50 mx-auto d-flex flex-column justify-content-center' style={{minHeight: '90vh'}}>
        //     <h1 className='text-center mb-3'>Login Page</h1>
        //     {alertEmail}
        //     {alertPassword}
        //     <Form onSubmit={handleLogin}>
        //         <Form.Group className="mb-3" controlId="formBasicEmail">
        //             <Form.Label>Email address</Form.Label>
        //             <Form.Control type="email" placeholder="Enter Email" name="email" value={form.email} onChange={handleChange} required />
        //         </Form.Group>

        //         <Form.Group className="mb-3" controlId="formBasicPassword">
        //             <Form.Label>Password</Form.Label>
        //             <Form.Control type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} required />
        //         </Form.Group>
        //         <div className="d-grid gap-2">
        //             <ButtonAction variant={'outline-dark'} text={'Log In'}/>
        //         </div>
        //         <div className="mt-3" style={{textAlign: "center"}}>
        //             <Form.Text>
        //                 Don't have an account ? <Link to={'/register'} style={{textDecoration: 'none', color: "black"}}><b>Sign In Here</b></Link>
        //             </Form.Text>
        //         </div>
        //     </Form>
        // </Container>
    )
}

export default FormLogin;