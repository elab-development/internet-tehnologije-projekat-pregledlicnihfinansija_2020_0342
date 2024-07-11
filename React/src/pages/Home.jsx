import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    const token = window.sessionStorage.getItem('access_token');


    return (
        <>
            <div className="intro text-center">
                <h1 className="text-center">
                    <span className="accent">Orjentišite</span> svoje finasnije
                </h1>
                <p className="text-center">
                    Planiranje troškova je tajna finansijske slobode. Uživaj slobodu već
                    danas.
                </p>
                
                {
                    !token && (
                        <Link to="/register">
                            <button className="btn btn-dark ">
                                <span className="accent">Započni ovde</span>
                            </button>
                        </Link>
                    )
                }
            </div>
        </>
    );
};

export default Home;