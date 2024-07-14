import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Button} from "react-bootstrap"; 
const JedanIzazov = props => {

    const izazov = props.izazov;
    let variant = izazov.status ? "success" : "danger";

    const handleDelete = () => {
        if (window.confirm('Da li ste sigurni da želite da izbrišete ovaj izazov?')) {
            props.onDelete(izazov.id);
        }
    };

    return (
        <>
            <Alert variant={variant} className="mt-3">
                <h3>{props.izazov.challengeName} ({izazov.challengeCategory.categoryName})</h3>
                <hr/>
                <p>Pocetak: {izazov.startDate} <br/>  Kraj: {izazov.endDate}</p>
                <p>Iznos {izazov.value} din</p>
                <Button variant="danger" onClick={handleDelete}>Izbriši</Button> 
            </Alert>
        </>
    );
};

JedanIzazov.propTypes = {
    izazov: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired 
};

export default JedanIzazov;
