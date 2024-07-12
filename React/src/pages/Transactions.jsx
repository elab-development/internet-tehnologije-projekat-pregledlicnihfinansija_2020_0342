import React, {useEffect, useState} from 'react';
import {Alert, Col, Form, Row, Table} from "react-bootstrap";
import axiosInstance from "../server/axiosInstance";
import {CSVLink} from "react-csv";
import useForm from "../hooks/useForm";

const Transactions = () => {
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    const [incomeCategories, setIncomeCategories] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [message, setMessage] = useState("");
    const [podaciDownloadTrosak, setPodaciDownloadTrosak] = useState([]);
    const [podaciDownloadUplata, setPodaciDownloadUplata] = useState([]);

    const [values, handleChange] = useForm({
        expenseName: "",
        expenseValue: 0,
        expense_category_id: 1,
        incomeName : "",
        incomeValue: 0,
        income_category_id: 1,
    });

    const updateUser = () => {
        axiosInstance.get("/profile").then((response) => {
            console.log('user data');
            console.log(response.data);
            window.sessionStorage.setItem('user', JSON.stringify(response.data));
        }).catch((error) => {
            console.error(error);
        });
    }
    const obrisiTrosak = (id) => {
        axiosInstance.delete("/expenses/" + id).then((response) => {
            console.log(response.data);
            setForceUpdate(!forceUpdate);
            updateUser();
            setMessage("Uspesno obrisan trosak");
        }).catch((error) => {
            console.error(error);
        });
    }

    const obrisiUplatu = (id) => {
        axiosInstance.delete("/incomes/" + id).then((response) => {
            console.log(response.data);
            setForceUpdate(!forceUpdate);
            updateUser();
            setMessage("Uspesno obrisana uplata");
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {

        axiosInstance.get("/users/" + user.id + "/expenses").then((response) => {
            console.log(response.data.data);
            let dataDownload = response.data.data.map((expense) => {
                return {
                    Naziv: expense.expenseName,
                    Datum: expense.expenseDate,
                    Iznos: expense.expenseValue,
                    Kategorija: expense.expenseCategory.categoryName
                }
            });
            setPodaciDownloadTrosak(dataDownload);
            setExpenses(response.data.data);
        }).catch((error) => {
            console.error(error);
        });
    }, [forceUpdate, user.id]);

    useEffect(() => {

            axiosInstance.get("/users/" + user.id + "/incomes").then((response) => {
                console.log(response.data.data);
                let dataDownload = response.data.data.map((income) => {
                    return {
                        Naziv: income.incomeName,
                        Datum: income.incomeDate,
                        Iznos: income.incomeValue,
                        Kategorija: income.incomeCategory.categoryName
                    }
                });

                setPodaciDownloadUplata(dataDownload);
                setIncomes(response.data.data);
            }).catch((error) => {
                console.error(error);
            });
    }, [forceUpdate, user.id]);

    useEffect(() => {
        axiosInstance.get("/income_categories").then((response) => {
            console.log(response.data);
            setIncomeCategories(response.data.categories);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        axiosInstance.get("/expense_categories").then((response) => {
            console.log(response.data);
            setExpenseCategories(response.data.categories);
        }).catch((error) => {
            console.error(error);
        });
    }, []);


    const dodajTrosak = () => {
        axiosInstance.post("/expenses", {
            expenseName: values.expenseName,
            expenseValue: values.expenseValue,
            category_id: values.expense_category_id,
        }).then((response) => {
            console.log(response.data);
            setForceUpdate(!forceUpdate);
            user.expenses_sum += parseInt(values.expenseValue);
            user.budget -= parseInt(values.expenseValue);
            window.sessionStorage.setItem('user', JSON.stringify(user));
            setMessage("Uspesno dodat trosak");
        }).catch((error) => {
            console.error(error);
        });
    }

    const dodajUplatu = () => {
        axiosInstance.post("/incomes", {
            incomeName: values.incomeName,
            incomeValue: values.incomeValue,
            category_id: values.income_category_id,
        }).then((response) => {
            console.log(response.data);
            setForceUpdate(!forceUpdate);
            user.incomes_sum += parseInt(values.incomeValue);
            user.budget += parseInt(values.incomeValue);
            window.sessionStorage.setItem('user', JSON.stringify(user));
            setMessage("Uspesno dodata uplata");
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div>
            <Row>
                <Col className="m-3 text-center">
                    <h1>Moje transakcije</h1>
                    <p>{message}</p>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <CSVLink
                        data={podaciDownloadTrosak}
                        filename={"troskovi.csv"}
                        className="btn btn-danger m-2"
                        target="_blank"
                    >
                       <FaDownload /> Skini tabelu troskova
                    </CSVLink>

                    <CSVLink
                        data={podaciDownloadUplata}
                        filename={"uplate.csv"}
                        className="btn btn-success m-2"
                        target="_blank"
                    >
                        <FaDownload /> Skini tabelu uplata
                    </CSVLink>

                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 className="text-center">Stanje</h1>
                    <Alert variant="info">
                        Budzet: {user.budget} din
                    </Alert>
                    <Alert variant="success">
                        Ukupno uplata: {user.incomes_sum} din
                    </Alert>
                    <Alert variant="danger">
                        Ukupno isplata: {user.expenses_sum} din
                    </Alert>
                </Col>
                <Col>
                    <h3 className="text-center">Dodaj trosak</h3>
                    <Form.Group className="mb-3" controlId="formCategory">
                        <Form.Label>Kategorija</Form.Label>
                        <Form.Select onChange={handleChange} name="expense_category_id" aria-label="Default select example">
                            {
                                expenseCategories && expenseCategories.map((category, index) => (
                                    <option key={index} value={category.id}>{category.categoryName}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Naziv</Form.Label>
                        <Form.Control type="text" name="expenseName" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Iznos</Form.Label>
                        <Form.Control type="number" name="expenseValue" onChange={handleChange} />
                    </Form.Group>
                    <hr />
                    <button onClick={dodajTrosak} className="btn btn-danger">Dodaj trosak</button>
                </Col>
                <Col>
                    <h3 className="text-center">Dodaj uplatu</h3>
                    <Form.Group className="mb-3" controlId="formCategory">
                        <Form.Label>Kategorija</Form.Label>
                        <Form.Select onChange={handleChange} name="income_category_id" aria-label="Default select example">
                            {
                                incomeCategories && incomeCategories.map((category, index) => (
                                    <option key={index} value={category.id}>{category.categoryName}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Naziv</Form.Label>
                        <Form.Control type="text" name="incomeName" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Iznos</Form.Label>
                        <Form.Control type="number" name="incomeValue" onChange={handleChange} />
                    </Form.Group>
                    <hr />
                    <button onClick={dodajUplatu} className="btn btn-success">Dodaj uplatu</button>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h1 className="text-center">Troskovi</h1>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Naziv</th>
                            <th>Datum</th>
                            <th>Iznos</th>
                            <th>Kategorija</th>
                            <th>Akcija</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            expenses && expenses.map((expense, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{expense.expenseName}</td>
                                    <td>{expense.expenseDate}</td>
                                    <td>{expense.expenseValue}</td>
                                    <td>{expense.expenseCategory.categoryName}</td>
                                    <td>
                                        <button onClick={() => obrisiTrosak(expense.id)} className="btn btn-danger">Obrisi trosak</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <h1 className="text-center">Prilivi</h1>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Naziv</th>
                            <th>Datum</th>
                            <th>Iznos</th>
                            <th>Kategorija</th>
                            <th>Akcija</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            incomes && incomes.map((income, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{income.incomeName}</td>
                                    <td>{income.incomeDate}</td>
                                    <td>{income.incomeValue}</td>
                                    <td>{income.incomeCategory.categoryName}</td>
                                    <td>
                                        <button onClick={() => obrisiUplatu(income.id)} className="btn btn-danger">Obrisi uplatu</button>
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

export default Transactions;
