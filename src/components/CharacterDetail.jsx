import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { toast } from "react-hot-toast";
function CharacterDetail({ selectedId, onAddFavourite, isAddToFavourite }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodeData].flat());
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading)
    return (
      <div style={{ flex: 1 }}>
        <Loader />
      </div>
    );

  if (!character || !selectedId)
    return (
      <div className="chardetail-description">
        {<ArrowDownCircleIcon className="icon" />} &nbsp;Please select the
        desired character to display its details&nbsp;
        {<ArrowDownCircleIcon className="icon" />}
      </div>
    );

  return (
    <div className="character-details-container" style={{ flex: 1 }}>
      <CharacterSubInfo
        onAddFavourite={onAddFavourite}
        character={character}
        isAddToFavourite={isAddToFavourite}
      />
      <EpisodeList episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;

function CharacterSubInfo({ character, isAddToFavourite, onAddFavourite }) {
  return (
    <div className="character-detail">
      <div className="character-detail__img-container">
        <img
          src={character.image}
          alt={character.name}
          className="character-detail__img"
        />
        <h3 className="name">
          <span>{character.gender === "Male" ? "👱🏻‍♂️" : "👩🏻‍🦳"}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
      </div>
      <div className="character-detail__info">
        <div className="info-title">
          <h3>Info &nbsp;</h3>
          <div className="horizontal-info-line"></div>
        </div>
        <div className="info">
          <div className="info-status">
            <span>
              Status:&nbsp;
              <span
                className={`status ${
                  character.status === "Dead"
                    ? "red"
                    : character.status === "unknown"
                    ? "blue"
                    : ""
                }`}
              ></span>
              &nbsp;{character.status}
            </span>
          </div>
          <div className="info-species">
            <span>Species:&nbsp;{character.species}</span>
          </div>
          <div className="info-gender">
            <span>Gender:&nbsp;{character.gender}</span>
          </div>
        </div>
        <div className="location">
          <p>Last known location:</p>
          <p>{character.location.name}</p>
        </div>
        <hr />
        <div className="actions">
          {isAddToFavourite ? (
            <p>Already Added ✅</p>
          ) : (
            <button
              onClick={() => onAddFavourite(character)}
              className="btn btn--primary"
            >
              Add to Favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodeList({ episodes }) {
  const [sortBy, setSortby] = useState(true);

  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button onClick={() => setSortby((is) => !is)}>
          <ArrowUpCircleIcon
            className="icon"
            style={{ rotate: sortBy ? "0deg" : "180deg" }}
          />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} - {item.episode} :{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
