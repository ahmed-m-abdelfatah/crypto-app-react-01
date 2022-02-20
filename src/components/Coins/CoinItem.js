import React from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import LazyLoad from 'react-lazyload';

function CoinItem({ coin }, ref) {
  console.log('~ CoinItem');

  const percentageStyle = ['d-flex', 'align-items-center', 'justify-content-center', 'text-bold', 'fs-2'];

  let drawArrow;

  if (coin.price_change_percentage_24h != null) {
    const isChangeInPercentageNegative = coin.price_change_percentage_24h.toFixed(2) < 0;

    isChangeInPercentageNegative ? percentageStyle.push('text-danger') : percentageStyle.push('text-success');

    drawArrow = () => (isChangeInPercentageNegative ? <GoTriangleDown size={20} /> : <GoTriangleUp size={20} />);
  }

  return (
    <div className='card user-select-none pointer-event' ref={ref}>
      <div className='card-body text-capitalize text-center'>
        <p className='fs-4 mb-0'>Rank: {coin.market_cap_rank}</p>
        <p className='fs-3 mb-3'>{coin.id}</p>
        <div className='mb-3'>
          <LazyLoad height={300} offset={200} once>
            <img src={coin.image} alt={coin.id} className='w-50 mb-4' />
          </LazyLoad>
          <p className='mb-3'>{coin.symbol.toUpperCase()}</p>
        </div>
        <p className='mb-3 h1'>${coin.current_price != null ? coin.current_price.toLocaleString() : 'NULL'}</p>
        <p className={percentageStyle.join(' ')}>
          {typeof drawArrow === 'function' && drawArrow()}
          {coin.price_change_percentage_24h != null && coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

export default React.forwardRef(CoinItem);
