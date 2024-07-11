import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import wave from './assets/wave.svg';
import Navigation from "./components/Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {Container} from "react-bootstrap";

function App() {
  return (
      <div className="layout">
        <Navigation />
        <Container className="main-container">
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </Container>
        <img src={wave} width="100%" alt=""/>
      </div>
  );
}

export default App;
