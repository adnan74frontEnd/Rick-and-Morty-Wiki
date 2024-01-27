import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";

export default function Navbar({ children }) {
  return <nav className="navbar">{children}</nav>;
}
export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="search..."
    />
  );
}
export function FilterStatus({ status, setStatus }) {
  return (
    <select
      className="filter-field"
      onChange={(event) => setStatus(event.target.value)}
      value={status}
    >
      <option>No status</option>
      <option value="Alive">Alive</option>
      <option value="Dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>
  );
}
export function FilterGender({ gender, setGender }) {
  return (
    <select
      className="filter-field"
      onChange={(event) => setGender(event.target.value)}
      value={gender}
    >
      <option>No gender</option>
      <option value="Female">Female</option>
      <option value="Male">Male</option>
      <option value="unknown">Unknown</option>
    </select>
  );
}
// export function SearchResult({ numOfResult }) {
//   return <div className="navbar__result">Found {numOfResult} characters</div>;
// }
export function Favourites({ favourites, onDeleteFavourite }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title="List of Favourites">
        {favourites.map((item) => (
          <div className="modal-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3 className="modal-item__name">
              <span> {item.name}</span>
            </h3>
            <div className="modal-item__info">
              <div>
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
              <span>{item.gender}</span>
            </div>
            <button
              className="icon red"
              onClick={() => onDeleteFavourite(item.id)}
            >
              <TrashIcon />
            </button>
          </div>
          // <Character key={item.id} item={item}>
          //   <button
          //     className="icon red"
          //     onClick={() => onDeleteFavourite(item.id)}
          //   >
          //     <TrashIcon />
          //   </button>
          // </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </>
  );
}
