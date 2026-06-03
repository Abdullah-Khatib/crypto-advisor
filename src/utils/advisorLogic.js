// Calculate where the price sits within the last 24 hours (0 to 100)
const getMomentumScore = (coin) => {
  const dayRange = coin.high_24h - coin.low_24h;
  if (dayRange === 0) return 0;
  return ((coin.current_price - coin.low_24h) / dayRange) * 100;
};

// BUY: Trending up, strong momentum, far from ATH
export const getBuyRecommendations = (coins) => {
  return [...coins]
    .map((coin) => {
      const momentum = getMomentumScore(coin);
      let score = 0;

      if (coin.price_change_percentage_24h > 2) score += 3;
      else if (coin.price_change_percentage_24h > 0) score += 1;

      if (momentum > 70) score += 3;
      else if (momentum > 50) score += 1;

      if (coin.ath_change_percentage < -30) score += 2;

      return { ...coin, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // Top 5 for the card
};

// SELL: Trending down, weak momentum, or very close to ATH (potentially overbought)
export const getSellRecommendations = (coins) => {
  return [...coins]
    .map((coin) => {
      const momentum = getMomentumScore(coin);
      let score = 0;
      if (coin.price_change_percentage_24h < -3) score += 3;
      else if (coin.price_change_percentage_24h < 0) score += 1;
      if (momentum < 30) score += 3;
      else if (momentum < 50) score += 1;
      if (coin.ath_change_percentage > -10) score += 2;
      return { ...coin, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
};

// TOP: Purely by Market Cap rank
export const getMarketLeaders = (coins) => {
  return [...coins]
    .sort((a, b) => a.market_cap_rank - b.market_cap_rank)
    .slice(0, 5);
};