import React, {useEffect, useState} from 'react';
import axiosInstance from "../server/axiosInstance";
import {Col, Row, Table} from "react-bootstrap";

const Tabela = () => {
    const [podaci, setPodaci] = useState([]);

    useEffect(() => {
        axiosInstance.get('/tabela').then((response) => {
            console.log(response.data);
            setPodaci(response.data.data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);
    return (
        <>
            <Row>
                <Col className="m-3 text-center">
                    <h1>Top 5 lista</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Broj uspesnih izazova</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               podaci && podaci.map((user, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.username}</td>
                                        <td>{user.totalChallenges}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    );
};

export default Tabela;