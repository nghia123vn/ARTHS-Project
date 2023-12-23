import axios from "axios";


export const requestCoinPrice = async (id: string) => {
    const { data } = await axios({
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=1&page=1&sparkline=false&locale=en`,
      headers: {
        Accept: "application/json"
      }
    });
    return data[0];
};
