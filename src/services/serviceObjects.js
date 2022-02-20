const baseUrl = 'https://api.coingecko.com';

export const displayCoinsServiceObject = (pageNumber, itemsPerPage) => ({
  method: 'GET',
  url: `${baseUrl}/api/v3/coins/markets`,
  params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: itemsPerPage, page: pageNumber, sparkline: false },
});

export const displayCoinServiceObject = coinId => ({
  method: 'GET',
  url: `${baseUrl}/api/v3/coins/${coinId}`,
});
