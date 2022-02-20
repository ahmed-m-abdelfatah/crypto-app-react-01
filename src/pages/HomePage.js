import React, { useCallback, useRef, useState } from 'react';
import Coins from '../components/Coins/Coins';
import Loading from '../components/Loading/Loading';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

export default function HomePage() {
  console.log('~ HomePage');

  const [pageNumber, setPageNumber] = useState(1);

  const { loading, error, data, hasMore } = useInfiniteScroll(pageNumber, 10);

  const observer = useRef();

  const lastCoinElement = useCallback(
    node => {
      if (loading) return;

      // when we reach the lastCoinElement
      // [1] we disconnect the observer
      // [2] pageNumber++
      // [3] add new observer to tne new lastCoinElement

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => (data.length >= 100 ? prevPageNumber : prevPageNumber + 1));
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, data],
  );

  const mesStyle = ['text-center', 'fs-2', 'text-white', 'mb-2', 'p-3'];

  return (
    <div className='py-5 text-center text-capitalize'>
      <h1 className='mb-4'>top 100 coins in the market</h1>
      {data.length > 0 ? (
        <Coins coins={data} setPageNumber={setPageNumber} hasMore={hasMore} ref={lastCoinElement} />
      ) : (
        <Loading />
      )}
      {loading && <div className={mesStyle.join(' ')}>Loading ...</div>}
      {error && <div className={mesStyle.join(' ')}>Error</div>}
    </div>
  );
}
