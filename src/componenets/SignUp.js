import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import notesContext from "../context/notes/NotesContext";

function SignUp() {
    const context = useContext(notesContext);
    const {showAlert} = context;
    const [data, setData] = useState({name: "", email: "", password: "", rPassword: ""});
    let history = useNavigate();
    const signUp = async () => {
        if (data.password !== data.rPassword) {
            showAlert("Password not match", "warning");
            return;
        }
        let headersList = {
            "Content-Type": "application/json"
        }
        let bodyContent = JSON.stringify({
            "name": data.name,
            "email": data.email,
            "password": data.password
        });
        let response = await fetch("http://127.0.0.1:5000/api/auth/createuser", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        let res = await response.json();
        if (res.authToken) {
            showAlert('Sign up succesfully now Log in!', 'success');
            history('/login');
        } else {
            showAlert(res.error, 'warning');
        }
    };
    const onChangeData = (e) => {
        if (e.target.id === 'name') {
            setData({
                name: e.target.value,
                email: data.email,
                password: data.password,
                rPassword: data.rPassword
            });
        } else if (e.target.id === 'email') {
            setData({
                name: data.name,
                email: e.target.value,
                password: data.password,
                rPassword: data.rPassword
            });
        } else if (e.target.id === 'password') {
            setData({
                name: data.name,
                email: data.email,
                password: e.target.value,
                rPassword: data.rPassword
            });
        } else {
            setData({
                name: data.name,
                email: data.email,
                password: data.password,
                rPassword: e.target.value
            });
        }
    };
    return (
        <section className="vh-100" style={{backgroundColor: "#eee"}}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{borderRadius: "25px"}}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                        <form className="mx-1 mx-md-4">
                                            {/*Name*/}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input value={data.name} onChange={onChangeData} type="text"
                                                           id="name" name="name" className="form-control"/>
                                                    <label className="form-label" htmlFor="name">Your
                                                        Name</label>
                                                </div>
                                            </div>
                                            {/*Email*/}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input value={data.email} onChange={onChangeData} type="email"
                                                           id="email" name="email" className="form-control"/>
                                                    <label className="form-label" htmlFor="email">Your
                                                        Email</label>
                                                </div>
                                            </div>
                                            {/*Password*/}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input value={data.password} onChange={onChangeData} type="password"
                                                           id="password" name="password"
                                                           className="form-control"/>
                                                    <label className="form-label"
                                                           htmlFor="password">Password</label>
                                                </div>
                                            </div>
                                            {/*Confirm Password*/}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input value={data.rPassword} onChange={onChangeData} id="rPassword"
                                                           name="rPassword"
                                                           type="password"
                                                           className="form-control"/>
                                                    <label className="form-label" htmlFor="rPassword">Repeat your
                                                        password</label>
                                                </div>
                                            </div>
                                            {/*SignUp button*/}
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button onClick={signUp} type="button"
                                                        className="btn btn-primary btn-lg">Register
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div
                                        className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample image"/>
                                    </div>
                                </div>
                                <div className="text-center text-lg-start ">
                                    <p className="small fw-bold">Already Have Acount?
                                        <Link to="/login" className="link-danger">LogIn</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;