import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useCharacters(url, query, status, gender) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatusCharacters, setFilterStatusCharacters] = useState([]);
  const [filterGenderCharacters, setFilterGenderCharacters] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}=${query}`, { signal });
        const finalStatusResults = data.results.filter((item) =>
          status !== "no status" ? item.status === status : []
        );
        const finalGenderResults = data.results.filter((item) =>
          gender !== "no gender" ? item.gender === gender : []
        );

        setCharacters(data.results);
        setFilterStatusCharacters(finalStatusResults);
        setFilterGenderCharacters(finalGenderResults);
      } catch (err) {
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query, status, gender]);

  return {
    isLoading,
    characters,
    filterStatusCharacters,
    filterGenderCharacters,
  };
}
