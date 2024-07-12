import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from "react-bootstrap"; 
const JedanIzazov = props => {

    const izazov = props.izazov;
    let variant = izazov.status ? "success" : "danger";


    return (
        <>
            <Alert variant={variant} className="mt-3">
                <h3>{izazov.challengeName} ({izazov.challengeCategory.categoryName})</h3>
                <hr/>
                <p>Pocetak: {izazov.startDate} <br/>  Kraj: {izazov.endDate}</p>
                <p>Iznos {izazov.value} din</p>
            </Alert>
        </>
    );
};

JedanIzazov.propTypes = {
    izazov: PropTypes.object.isRequired
};

export default JedanIzazov;
