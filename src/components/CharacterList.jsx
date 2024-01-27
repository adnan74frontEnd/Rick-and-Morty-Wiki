import Loader from "./Loader";

function CharacterList({
  selectedId,
  characters,
  isLoading,
  onSelectCharacter,
  filterStatusCharacters,
  filterGenderCharacters,
}) {
  if (isLoading)
    return (
      <div className="characters-list">
        <Loader />
      </div>
    );
  const filterAllCharacters = [
    ...filterStatusCharacters,
    ...filterGenderCharacters,
  ].filter(
    (value, index) =>
      [...filterStatusCharacters, ...filterGenderCharacters].indexOf(value) !==
      index
  );

  const showCharacters =
    filterStatusCharacters.length && filterGenderCharacters.length
      ? filterAllCharacters
      : filterGenderCharacters.length
      ? filterGenderCharacters
      : filterStatusCharacters.length
      ? filterStatusCharacters
      : characters;
  return (
    <div className="characters-list">
      {showCharacters.map((item) => (
        <Character key={item.id} item={item}>
          <button
            className="btn btn--primary"
            onClick={() => onSelectCharacter(item.id)}
          >
            {selectedId === item.id ? "Shown" : "View details "}
          </button>
        </Character>
      ))}
    </div>
  );
}

export default CharacterList;

export function Character({ item, children }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharaterName item={item} />
      <CharacterInfo item={item} />
      {children}
    </div>
  );
}

function CharaterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "👱🏻‍♂️" : "👩🏻‍🦳"}</span>
      <span> {item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <div>
        Status:&nbsp;
        <span
          className={`status ${
            item.status === "Dead"
              ? "red"
              : item.status === "unknown"
              ? "blue"
              : ""
          }`}
        >
          {" "}
        </span>
        <span> {item.status} </span>
      </div>
      <span>Species: {item.species}</span>
      <span>Gender: {item.gender}</span>
    </div>
  );
}
