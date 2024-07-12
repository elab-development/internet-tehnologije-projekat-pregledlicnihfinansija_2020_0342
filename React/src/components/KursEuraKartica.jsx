import React, {useEffect, useState} from 'react';
import axiosInstance from "../server/axiosInstance";
import {Card} from "react-bootstrap";

const KursEuraKartica = () => {
    const [podaci, setPodaci] = useState(null);

    useEffect(() => {
        axiosInstance.get('/kurs').then((response) => {
            console.log(response.data);
            setPodaci(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>Kurs eura</Card.Title>
                    <Card.Text>
                        {podaci ? (
                            <>
                                <span>Prodajni kurs: <b>{podaci.exchange_sell} </b> din</span><br/>
                                <span>Srednji kurs: <b>{podaci.exchange_middle}</b> din</span><br/>
                                <span>Kupovni kurs: <b>{podaci.exchange_buy}</b> din</span><br/>
                            </>
                        ) : (
                           <> Učitavanje podataka...</>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default KursEuraKartica;