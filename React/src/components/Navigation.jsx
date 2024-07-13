import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import logomark from "../assets/logomark.svg";

const Navigation = () => {

    const token = window.sessionStorage.getItem('access_token');
    const username = window.sessionStorage.getItem('username');
    const user = token ? JSON.parse(window.sessionStorage.getItem('user')) : null;
    const admin = user ? user.role === 'admin' : false;
    const logout = () => {
        window.sessionStorage.removeItem('access_token');
        window.sessionStorage.removeItem('username');
        window.sessionStorage.removeItem('user');
        window.location.href = '/register';
    }


    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logomark}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="CoinCompass"
                        />
                        <span> <span style={{color: 'gold'}}>Coin</span>Compass</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Pocetna</Nav.Link>
                            <Nav.Link href="/tabela">Tabela</Nav.Link>
                            
                            {
                                !token && (
                                    <Nav.Link href="/register">Login</Nav.Link>
                                )
                            }
                            {
                                token && (
                                    <>
                                        <Nav.Link href="/transactions">Transakcije</Nav.Link>
                                        <Nav.Link href="/challenges">Izazovi</Nav.Link>
                                    </>
                                )
                            }
                            {
                                token && (
                                    <Nav.Link href="#" onClick={logout}>Logout</Nav.Link>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;