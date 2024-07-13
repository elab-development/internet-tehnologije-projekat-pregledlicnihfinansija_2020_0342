import React, {useEffect, useState} from 'react';
import {Col, Form, Row, Table} from "react-bootstrap";
import axiosInstance from "../server/axiosInstance";

const Admin = () => {
    const [message, setMessage] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [pretraga, setPretraga] = useState("");

    const obrisiTrosak = (id) => {
        axiosInstance.delete("/expenses/" + id).then((response) => {
            console.log(response.data);
            setMessage("Uspesno obrisan trosak");
            setForceUpdate(!forceUpdate);
        }).catch((error) => {
            console.error(error);
        });
    }

    const obrisiUplatu = (id) => {
        axiosInstance.delete("/incomes/" + id).then((response) => {
            console.log(response.data);
            setMessage("Uspesno obrisana uplata");
            setForceUpdate(!forceUpdate);
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        axiosInstance.get("/pretraga?name=" + pretraga).then((response) => {
            console.log(response.data.data);
            setExpenses(response.data.data);
        }).catch((error) => {
            console.error(error);
        });
    }, [pretraga, forceUpdate]);


    return (
        <div>
            <Row>
                <Col className="m-3 text-center">
                    <h1>Admin stranica</h1>
                    <p>{message}</p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h3 className="text-center">Svi Prilivi</h3>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Naziv</th>
                            <th>Datum</th>
                            <th>Iznos</th>
                            <th>Kategorija</th>
                            <th>Korisnik</th>
                            <th>Akcije</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            incomes.map((income, index) => (
                                <tr key={income.id}>
                                    <td>{income.id}</td>
                                    <td>{income.incomeName}</td>
                                    <td>{income.incomeDate}</td>
                                    <td>{income.incomeValue}</td>
                                    <td>{income.categoryName}</td>
                                    <td>{income.username}</td>
                                    <td>
                                        <button onClick={() => {
                                            obrisiUplatu(income.id)
                                        }} className="btn btn-danger">Obrisi uplatu</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3 className="text-center">Pretraga Troskova</h3>
                    <Form.Group className="mt-3">
                        <Form.Control placeholder="Pretrazi troskove" type="text" onChange={(event) => {
                            if (event.target.value.length > 2 || event.target.value === "") {
                                setPretraga(event.target.value);
                            }
                        }}/>
                    </Form.Group>
                    <Table hover className="mt-3">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Naziv</th>
                            <th>Datum</th>
                            <th>Iznos</th>
                            <th>Kategorija</th>
                            <th>Korisnik</th>
                            <th>Akcije</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            expenses.map((expense, index) => (
                                <tr key={expense.id}>
                                    <td>{expense.id}</td>
                                    <td>{expense.expenseName}</td>
                                    <td>{expense.expenseDate}</td>
                                    <td>{expense.expenseValue}</td>
                                    <td>{expense.expenseCategory.categoryName}</td>
                                    <td>{expense.user.username}</td>
                                    <td>
                                        <button onClick={() => {
                                            obrisiTrosak(expense.id)
                                        }} className="btn btn-danger">Obrisi trosak</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    );
};

export default Admin;