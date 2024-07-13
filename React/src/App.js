import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import wave from './assets/wave.svg';
import Navigation from "./components/Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Register from "./pages/Register";
import Challenges from "./pages/Challenges";
import {Container} from "react-bootstrap";
import Tabela from "./pages/Tabela";
import Admin from "./pages/Admin";
function App() {
  return (
      <div className="layout">
        <Navigation />
        <Container className="main-container">
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tabela" element={<Tabela />} />
                <Route path="/register" element={<Register />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </Container>
        <img src={wave} width="100%" alt=""/>
      </div>
  );
}

export default App;
