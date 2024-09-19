import {useEffect, useState} from "react";

function App() {
    const [coins, setCoins] = useState([]); // 코인의 데이터를 담을 state
    const [loading, setLoading] = useState(true);
    const [selectCoin, setSelectCoin] = useState(0); // 선택한 코인의 가격
    const [money, setMoney] = useState(1); // 내 돈 총 20달러
    const [value, setValue] = useState(0);

    const onChangeCoin = (event) => {setSelectCoin(event.target.value)}
    const onChangeMoney = (event) => {setMoney(event.target.value)}

    // 코인 API 불러오기
    useEffect(() => {
            fetch("https://api.coinpaprika.com/v1/tickers")
                .then((response) => response.json())
                .then((data) => (
                    setCoins(data),
                    setLoading(false),
                    setSelectCoin('')
        ))
    }, []);

  return (
      <div>
          <h1>Coin Coin Change!</h1>
              {loading ? "" : <h2>({coins.length} different coins!)</h2>}

              {loading ? <strong>"loading..."</strong> :
               ( <select value={selectCoin} onChange={onChangeCoin}>
                   <option value="" disabled> Select Coin! </option>
                    {coins.map((coin) => (
                    <option key={coin.id} value={coin.quotes.USD.price}>
                     {coin.name} : {coin.quotes.USD.price} {coin.symbol}
                    </option>
              ))}
                </select>)}

          <br/>
          <br/>

          <input
              placeholder="input your money"
              type="number"
              onChange={onChangeMoney}
              value={money}
              min={1}
              max={20}/> USD
          <hr/>

          <h2> {selectCoin ? selectCoin/money : null} </h2>
      </div>
  );
}

export default App;