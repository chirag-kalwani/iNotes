import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import notesContext from "../context/notes/NotesContext"; // useHistory change to useNavigate

function Login() {
    const [data, setData] = useState({email: "", password: ""});
    const context = useContext(notesContext);
    const {showAlert} = context;
    let histoy = useNavigate();
    const LogIn = async (e) => {
        e.preventDefault();
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "email": data.email,
            "password": data.password
        });

        let response = await fetch("http://127.0.0.1:5000/api/auth/login", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        let res = await response.json();
        if (res.authToken !== undefined) {
            // redirect and save authToken
            localStorage.clear();
            localStorage.setItem('authToken', res.authToken);
            showAlert("Loged in succesfully", 'success');
            histoy('/');
        } else {
            showAlert(res.error, 'warning');
        }
    };
    const onChangeData = (e) => {
        if (e.target.id === 'email') {
            setData({
                email: e.target.value,
                password: data.password
            });
        } else {
            setData({
                email: data.email,
                password: e.target.value
            });
        }
    };
    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                             className="img-fluid" alt="Sample image"/>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form method="POST">

                            {/*Email*/}
                            <div className="form-outline mb-4">
                                <input onChange={onChangeData} value={data.email} type="email" id="email" name="email"
                                       className="form-control form-control-lg"
                                       placeholder="Enter a valid email address"/>
                                <label className="form-label" htmlFor="email">Email address</label>
                            </div>
                            {/*Password*/}
                            <div className="form-outline mb-3">
                                <input onChange={onChangeData} value={data.password} type="password" name="password"
                                       id="password"
                                       className="form-control form-control-lg"
                                       placeholder="Enter password"/>
                                <label className="form-label" htmlFor="password">Password</label>
                            </div>
                            {/*button*/}
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button onClick={LogIn} type="submit" className="btn btn-primary btn-lg"
                                        style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Login
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
                                    <Link to="/signup" className="link-danger">Register</Link>
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;