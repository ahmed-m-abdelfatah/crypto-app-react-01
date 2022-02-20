import { useEffect, useState } from 'react';
import axiosRequest from '../services/axiosRequest';
import { displayCoinServiceObject } from '../services/serviceObjects';

export default function useCoinDataPage(id) {
  console.log('~ useCoinDataPage');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coin, setCoin] = useState([]);

  // TODO without useEffect it keep calling for ever
  useEffect(() => {
    setLoading(true);
    setError(false);

    if (id) {
      axiosRequest(displayCoinServiceObject(id))
        .then(response => {
          setCoin(response);
        })
        .catch(error => {
          console.error('~ error', error);
          setError(true);
        });
    }

    setTimeout(() => setLoading(false), 1000);
  }, [id]);

  return { loading, error, coin };
}
