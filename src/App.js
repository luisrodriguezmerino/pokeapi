import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import HomePages from "./pages/Home";
import PokeDetails from "./pages/PokeDetails";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import FavoritePages from "./pages/Favorites";
import PokemonCapturados from "./pages/PokemonCapturados";
import About from "./pages/about";
import Layout from "./layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePages />} />
        <Route element={<NavBar />} />
        <Route element={<SearchBar />} />
      </Route>
      <Route path="detalles" element={<Layout />}>
        <Route path=":pokemondetails" element={<PokeDetails />} />
        <Route index element={<PokeDetails />} />
        <Route element={<NavBar />} />
        <Route element={<SearchBar />} />
      </Route>
      <Route path="favoritos" element={<Layout />}>
        <Route index element={<FavoritePages />} />
        <Route element={<NavBar />} />
      </Route>
      <Route path="pokemons-capturados" element={<Layout />}>
        <Route index element={<PokemonCapturados />} />
        <Route element={<NavBar />} />
      </Route>
      <Route path="about" element={<Layout />}>
        <Route index element={<About />} />
        <Route element={<NavBar />} />
      </Route>
    </Routes>
  );
}

export default App;
