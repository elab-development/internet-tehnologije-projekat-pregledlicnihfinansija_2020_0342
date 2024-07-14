import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import KursEuraKartica from "../components/KursEuraKartica";
import axiosInstance from "../server/axiosInstance";

const Home = () => {
    
    const token = window.sessionStorage.getItem('access_token');
    //useState koristimo kao container za objekte koje cemo vise puta koristiti kroz stranicu
    const [randomUser, setRandomUser] = React.useState(null);


    //okida se, na svako malo 
    //[]-uslov 
    useEffect(() => {
        axiosInstance.get('https://randomuser.me/api/').then((response) => {
            console.log(response.data.results[0]);
            let random = response.data.results[0];

            let userFromAPI = {
                name: random.name.first + " " + random.name.last,
                email: random.email,
                picture: random.picture.large,
                description: "Koristim ovaj sajt već dugo. Preporučujem ga svima. Pomogao mi je da uštedim mnogo novca. A verujem da će i vama pomoći."
            }
            setRandomUser(userFromAPI);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <>
            <div className="intro text-center">
                <h1 className="text-center">
                    <span className="accent">Orijentišite</span> svoje finasnije
                </h1>
                <p className="text-center">
                    Planiranje troškova je tajna finansijske slobode. Uživaj slobodu već
                    danas.
                </p>
                {
                    token && <KursEuraKartica />
                }
                {
                    !token && randomUser && (
                        <div className="text-center">
                            <img src={randomUser.picture} alt={randomUser.name} className="rounded-circle" />
                            <h3>{randomUser.name}</h3>
                            <p>{randomUser.email}</p>
                            <hr/>
                            <p>{randomUser.description}</p>
                        </div>
                    )
                }
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