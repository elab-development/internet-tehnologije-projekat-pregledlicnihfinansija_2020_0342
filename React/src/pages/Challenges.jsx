import React, {useEffect, useState} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import axiosInstance from "../server/axiosInstance";
import JedanIzazov from "../components/JedanIzazov";
import useForm from "../hooks/useForm";

const Challenges = () => {
    const [message, setMessage] = useState("");
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    const [challengeCategories, setChallengeCategories] = useState([]);
    const [values, handleChange] = useForm({
        challengeName: "",
        challenge_category_id: 1,
        endDate: "",
        value: 0,
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

    const dodajIzazov = () => {
        console.log(values);
        axiosInstance.post("/challenges", {
            challengeName: values.challengeName,
            challengeCategory: values.challenge_category_id,
            endDate: values.endDate,
            value: values.value
        }).then((response) => {
            console.log(response.data);

            if (response.data.success) {
                setMessage(response.data.message);
                axiosInstance.get("/users/"+ user.id +"/challenges").then((response) => {
                    console.log(response.data.data);
                }).catch((error) => {
                    console.error(error);
                });
            }else{
                setMessage(response.data.message);
            }

        }).catch((error) => {
            console.error(error);
            setMessage(error.response.data.message);
        });
    }


    useEffect(() => {
        axiosInstance.get("/challenge_categories").then((response) => {
            console.log(response.data);
            setChallengeCategories(response.data.challenge_categories);
        }).catch((error) => {
            console.error(error);
        });
    }, []);


    useEffect(() => {
        axiosInstance.get("/users/"+ user.id +"/challenges").then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <div>
            <Row>
                <Col className="m-3 text-center">
                    <h1>Moji izazovi</h1>
                    <p>{message}</p>
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <h3 className="text-center">Dodaj izazov </h3>
                    <Form.Group>
                        <Form.Label>Naziv izazova</Form.Label>
                        <Form.Control onChange={handleChange} type="text" name="challengeName"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Kategorija</Form.Label>
                        <Form.Select onChange={handleChange} name="challenge_category_id" aria-label="Default select example">
                            {
                                challengeCategories && challengeCategories.map((category) => {
                                    return (
                                        <option key={category.id} value={category.id}>{category.categoryName}</option>
                                    );
                                })
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Kraj</Form.Label>
                        <Form.Control onChange={handleChange} type="date" name="endDate" min="today"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Iznos</Form.Label>
                        <Form.Control onChange={handleChange} type="number" name="value"/>
                    </Form.Group>
                    <hr />
                    <button className="btn btn-primary" onClick={dodajIzazov}>Dodaj</button>

                </Col>
                <Col md={8}>
                    <h3 className="text-center">Moji izazovi</h3>

                    <Form.Group>
                        <Form.Label>Prikazi:</Form.Label>
                    </Form.Group>
                            return (
                                <JedanIzazov key={challenge.id} izazov={challenge} />
                            );
                </Col>
            </Row>
        </div>
    );
};

export default Challenges;