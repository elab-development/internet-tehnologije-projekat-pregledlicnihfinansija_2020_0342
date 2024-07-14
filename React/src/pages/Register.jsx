import "../assets/css/Register.css";
import Slika from "../assets/formaslika.png";
import useForm from "../hooks/useForm";
import axiosInstance from "../server/axiosInstance";
import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";

const Register = () => {
    const [values, handleChange] = useForm({
        userName: "",
        email: "",
        password: "",
    });

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    const register = () => {
        axiosInstance.post("/register", {
            username: values.userName,
            email: values.email,
            password: values.password,
        }).then((response) => {
            console.log(response.data);

            if (response.data.success) {
                setShowMessage(true);
                setMessage(response.data.message);
            }else{
                setShowMessage(true);
                let errors = response.data.errors;

                let errorMessage = "";
                for (let key in errors) {
                    errorMessage += errors[key] + "\n";
                }

                setMessage(errorMessage);
            }


        }).catch((error) => {
            console.error(error);
        });
    }

    const login = () => {

        axiosInstance.post("/login", {
            email: values.email,
            password: values.password,
        }).then((response) => {
            console.log(response.data);

            if (response.data.success) {
                setShowMessage(true);
                setMessage(response.data.message);
                window.sessionStorage.setItem('access_token', response.data.access_token);
                window.sessionStorage.setItem('username', response.data.user.username);
                window.sessionStorage.setItem('user', JSON.stringify(response.data.user));
                window.location.href = '/';
            }else{
                setShowMessage(true);
                setMessage('Pogrešan email ili lozinka!');
            }

        }).catch((error) => {
            console.error(error);
            setMessage('Doslo je do greske prilikom logovanja! Pokusajte ponovo.');
        });

    }

    const handleRegisterClick = () => {
        const container = document.getElementById("container");
        container.classList.add("active");
    };

    const handleLoginClick = () => {
        const container = document.getElementById("container");
        container.classList.remove("active");
    };

    return (
        <>
            <Container>
                <Row className="m-5">
                    <Col md={6}>
                        <div className="login-container" id="container">
                            <div className="form-container sign-up">
                                <form>
                                    <p>...</p>
                                    <h1 className="naslovh1">Registruj se</h1>
                                    <p>...</p>
                                    <input
                                        className="inputR"
                                        type="text"
                                        name="userName"
                                        required
                                        placeholder="Unesite korisničko ime"
                                        aria-label="Your Name"
                                        autoComplete="given-name"
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="inputR"
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Unesite e-mail adresu"
                                        aria-label="E-mail adresa"
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="inputR"
                                        type="password"
                                        name="password"
                                        required
                                        placeholder="Unesite lozinku"
                                        aria-label="Lozinka"
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                    />
                                    <input type="hidden" name="_action" value="newUser"/>
                                    <button onClick={register} type="button">Registruj se</button>
                                    <p>{message}</p>
                                </form>
                            </div>
                            <div className="form-container sign-in">
                                <form>
                                    <p>...</p>
                                    <h1 className="naslovh1">Prijavi se</h1>
                                    <p>...</p>
                                    <input
                                        className="inputR"
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Unesite e-mail adresu"
                                        aria-label="E-mail adresa"
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="inputR"
                                        type="password"
                                        name="password"
                                        required
                                        placeholder="Unesite lozinku"
                                        aria-label="Lozinka"
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                    />
                                    <button onClick={login} type="button">Uloguj se</button>
                                    <p>{message}</p>
                                </form>
                            </div>
                            <div className="toggle-container">
                                <div className="toggle">
                                    <div className="toggle-panel toggle-left">
                                        <h2 className="naslovh2">Dobrodosao nazad!</h2>
                                        <p>
                                            Evidentirajte svoje lične podatke kako biste mogli da koristite
                                            sve funkcije sajta.
                                        </p>
                                        <button
                                            type="button"
                                            className="hidden"
                                            id="login"
                                            onClick={handleLoginClick}
                                        >
                                            Uloguj se
                                        </button>
                                    </div>
                                    <div className="toggle-panel toggle-right">
                                        <h2 className="naslovh2">Poštovanje, prijatelju!</h2>
                                        <p>
                                            Registrujte se koristeći vaše lične podatke kako biste imali
                                            pristup svim funkcijama sajta.
                                        </p>
                                        <button
                                            type="button"
                                            className="hidden"
                                            id="register"
                                            onClick={handleRegisterClick}
                                        >
                                            Registruj se
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <img className="slika" src={Slika} alt="slika"/>
                    </Col>
                </Row>
            </Container>


        </>
    );
};

export default Register;
