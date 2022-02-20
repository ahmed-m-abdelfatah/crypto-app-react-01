import { useEffect, useState } from 'react';
import axiosRequest from '../services/axiosRequest';
import { displayCoinsServiceObject } from '../services/serviceObjects';

export default function useInfiniteScroll(pageNumber, itemsPerPage) {
  console.log('~ useInfiniteScroll + pageNumber ' + pageNumber);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axiosRequest(displayCoinsServiceObject(pageNumber, itemsPerPage))
      .then(response => {
        setHasMore(response.length > 0);

        if (hasMore) {
          setData(prevData => {
            return [...new Set([...prevData, ...response])];
          });
        } else {
          return;
        }
      })
      .catch(error => {
        console.error('~ error', error);
        setError(true);
      });

    setTimeout(() => setLoading(false), 1000);
  }, [pageNumber, hasMore, itemsPerPage]);

  return { loading, error, data, hasMore };
}
