import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, {
  Favourites,
  Search,
  // SearchResult,onSelectCharacter
  FilterStatus,
  FilterGender,
} from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";
import HeaderApp from "./components/HeaderApp";

function App() {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("no status");
  const [gender, setGender] = useState("no gender");
  let {
    characters,
    isLoading,
    filterStatusCharacters,
    filterGenderCharacters,
  } = useCharacters(
    "https://rickandmortyapi.com/api/character/?name",
    query,
    status,
    gender
  );
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useLocalStorage("FAVOURITES", []);

  useEffect(() => {
    const interval = setInterval(() => setCount((c) => c + 1), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourite = (char) => {
    setFavourites((preFav) => [...preFav, char]);
  };

  const handleDeleteFavourite = (id) => {
    setFavourites((preFav) => preFav.filter((fav) => fav.id !== id));
  };

  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="app">
      <Toaster />
      <HeaderApp />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        {/* <SearchResult numOfResult={characters.length} /> */}
        <FilterStatus status={status} setStatus={setStatus} />
        <FilterGender gender={gender} setGender={setGender} />
        <Favourites
          favourites={favourites}
          onDeleteFavourite={handleDeleteFavourite}
        />
      </Navbar>
      <Main>
        <CharacterDetail
          selectedId={selectedId}
          onAddFavourite={handleAddFavourite}
          isAddToFavourite={isAddToFavourite}
        />
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          onSelectCharacter={handleSelectCharacter}
          isLoading={isLoading}
          filterStatusCharacters={filterStatusCharacters}
          filterGenderCharacters={filterGenderCharacters}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
