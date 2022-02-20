import { parse } from 'query-string';
import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import useCoinDataPage from '../hooks/useCoinDataPage';
import NotFoundPage from './NotFoundPage';

import './css/coinDataPage.min.css';
import DOMPurify from 'dompurify';

export default function CoinDataPage() {
  console.log('~ CoinDataPage');

  const location = useLocation();
  const query = useRef(parse(location.search));

  const { loading, error, coin } = useCoinDataPage(query.current?.id);

  const mesStyle = ['text-center', 'fs-2', 'text-white', 'mb-2', 'p-3'];
  return (
    <>
      {loading && <Loading />}
      {!query.current?.id && <NotFoundPage />}
      {!loading && query.current.id && <CoinData coin={coin} />}
      {error && <div className={mesStyle.join(' ')}>Error</div>}
    </>
  );
}

function CoinData({ coin }) {
  const cardStyle = ['card', 'bg-dark', 'text-white', 'rounded-3', 'my-3', 'px-2', 'py-2'];

  return (
    <div className='container py-4 coin-container'>
      <div className={cardStyle.join(' ')}>
        <h1>{coin.name}</h1>
      </div>

      {coin.market_data.current_price.usd && coin.image.small && coin.symbol && (
        <div className={cardStyle.join(' ')}>
          <div className='py-2'>
            <span className='rank-btn'>Rank # {coin.market_cap_rank}</span>
          </div>

          <div className=' row flex-wrap py-4'>
            <div className='col-md-6 py-2'>
              <div className='d-flex align-items-center justify-content-md-start justify-content-sm-center flex-wrap me-auto'>
                <img src={coin.image.small} alt='coin' className='me-3' />
                <p className='m-0 '>{coin.name}</p>
                <p className='m-0'>{coin.symbol.toUpperCase()}/USD</p>
              </div>
            </div>

            <div className='col-md-6 py-2'>
              <div className='d-flex justify-content-md-end justify-content-center me-md-4'>
                <h1>${coin.market_data.current_price.usd.toLocaleString()}</h1>
              </div>
            </div>
          </div>
        </div>
      )}

      {coin.market_data.price_change_percentage_1h_in_currency.usd &&
        coin.market_data.price_change_percentage_24h_in_currency.usd &&
        coin.market_data.price_change_percentage_7d_in_currency.usd &&
        coin.market_data.price_change_percentage_14d_in_currency.usd &&
        coin.market_data.price_change_percentage_30d_in_currency.usd &&
        coin.market_data.price_change_percentage_1y_in_currency.usd && (
          <div className={cardStyle.join(' ') + ' overflow-auto'}>
            <table>
              <thead>
                <tr>
                  <th>1h</th>
                  <th>24h</th>
                  <th>7d</th>
                  <th>14d</th>
                  <th>30d</th>
                  <th>1yr</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p>
                  </td>
                  <td>
                    <p>{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p>
                  </td>
                  <td>
                    <p>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p>
                  </td>
                  <td>
                    <p>{coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p>
                  </td>
                  <td>
                    <p>{coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p>
                  </td>
                  <td>
                    <p>{coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      {coin.market_data.low_24h.usd &&
        coin.market_data.high_24h.usd &&
        coin.market_data.market_cap.usd &&
        coin.market_data.circulating_supply && (
          <div className={cardStyle.join(' ')}>
            <div className='row'>
              <div className='col-md-6'>
                <div className='box'>
                  <h4>24 Hour Low</h4>
                  <p>${coin.market_data.low_24h.usd.toLocaleString()}</p>
                </div>
                <div className='box box-border'>
                  <h4>24 Hour High</h4>
                  <p>${coin.market_data.high_24h.usd.toLocaleString()}</p>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='box'>
                  <h4>Market Cap</h4>
                  <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
                </div>
                <div className='box'>
                  <h4>Circulating Supply</h4>
                  <p>{coin.market_data.circulating_supply}</p>
                </div>
              </div>
            </div>
          </div>
        )}

      {coin.description.en && (
        <div className={cardStyle.join(' ') + ' lead p-5'}>
          <div>
            <h3 className='lead'>About</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(coin.description.en),
              }}></p>
          </div>
        </div>
      )}

      <div className='text-center text-capitalize'>
        <Link to='/'>Go to Home</Link>
      </div>
    </div>
  );
}
