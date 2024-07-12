import React, {useEffect, useState} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import axiosInstance from "../server/axiosInstance";
import JedanIzazov from "../components/JedanIzazov";
import useForm from "../hooks/useForm";

const Challenges = () => {
    const [message, setMessage] = useState("");
    const [challenges, setChallenges] = useState([]);
    const [filteredChallenges, setFilteredChallenges] = useState([]);
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    const [challengeCategories, setChallengeCategories] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);
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


    const handleDelete = (id) => {
        axiosInstance.delete(`/challenges/${id}`).then(response => {
            console.log(response.data);
            setForceUpdate(!forceUpdate);
            updateUser();
            setChallenges(response.data.data);
            setFilteredChallenges(response.data.data);
            setMessage("Uspesno obrisan izazov");
        }).catch(error => {
            console.error("Došlo je do greške prilikom brisanja izazova:", error);
        });
    };
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
                    setChallenges(response.data.data);
                    setFilteredChallenges(response.data.data);
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

    const filtriraj = (e) => {

        if(e.target.value === "1"){
            setFilteredChallenges(challenges);
        }else if(e.target.value === "2"){
            setFilteredChallenges(challenges.filter((challenge) => challenge.status === true));
        }else if (e.target.value === "3"){
            setFilteredChallenges(challenges.filter((challenge) => challenge.status !== true));
        }
    }

    useEffect(() => {
        axiosInstance.get("/users/"+ user.id +"/challenges").then((response) => {
            console.log(response.data);
            setChallenges(response.data.data);
            setFilteredChallenges(response.data.data);
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
                        <Form.Select onChange={filtriraj}>
                            <option value="1">Svi</option>
                            <option value="2">Ispunjeni</option>
                            <option value="3">Neispunjeni</option>
                        </Form.Select>
                    </Form.Group>

                    {
                        filteredChallenges && filteredChallenges.map((challenge) => {
                            return (
                                <JedanIzazov key={challenge.id} izazov={challenge} />
                            );
                        })
                    }
                </Col>
            </Row>
        </div>
    );
};

export default Challenges;