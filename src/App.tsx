import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Game from './pages/Game/Game';
import Home from './pages/Home/Home';
import Pokemon from './pages/Pokemon/Pokemon';
import Pokemons from './pages/Pokemons/Pokemons';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemons" element={<Pokemons />} />
        <Route path="/pokemons/:id" element={<Pokemon />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
