import { useState, useEffect } from "react";
import axios from "axios";

const usePagination = (apiUrl, pageSize = 20) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}?_limit=${pageSize}&_page=${page}`);
        if (response.data.length > 0) {
          setData((prevData) => [...prevData, ...response.data]);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [apiUrl, page]);

  return { data, loading, hasMore, nextPage: () => setPage((prev) => prev + 1) };
};

export default usePagination;
