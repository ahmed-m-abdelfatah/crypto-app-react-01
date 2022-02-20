import React from 'react';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import CoinItem from './CoinItem';

import './css/coins.min.css';

function Coins({ coins }, ref) {
  console.log('~ Coins + coinsArr ' + coins.length);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className='container'>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'>
        {coins.map((coin, index, array) => {
          if (array.length === index + 1) {
            return (
              <Link to={`/coin?id=${coin.id}`} key={index} className='text-decoration-none text-black'>
                <CoinItem ref={ref} coin={coin} />
              </Link>
            );
          } else {
            return (
              <Link to={`/coin?id=${coin.id}`} key={index} className='text-decoration-none text-black'>
                <CoinItem coin={coin} />
              </Link>
            );
          }
        })}
      </Masonry>
    </div>
  );
}

export default React.forwardRef(Coins);
