import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Components/home/Home';
import Detail from './Components/detail/Detail';
import LandingPage from './Components/landingPage/LandingPage';
import Nav from './Components/nav/Nav';
import Form from './Components/form/Form';
import { useSelector } from 'react-redux';

function App() {
    const darkMode = useSelector((state) => state.darkMode);
    const location = useLocation();

    return (
        <div className={`App ${darkMode ? 'darkMode' : 'lightMode'}`}>
            {location.pathname !== '/' && <Nav />}
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/home' element={<Home />} />
                <Route path='/detail/:id' element={<Detail />} />
                <Route path='/form' element={<Form />} />
            </Routes>
        </div>
    );
}

export default App;
