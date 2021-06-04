import React , {useState , useEffect } from 'react';
import './index';
import Coin from './Coin';
import Page from './components/Page';
import axios from 'axios';

function App(){
  const [coins ,setCoins] = useState([]);
  const [currentPage ,setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(10);
  const [search,setSearch] = useState('');

  useEffect (() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data); 
    })
    .catch(error => console.log(error));
  }, []);  


  const handleChange = (e) => {
    setSearch(e.target.value);
    coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
      )
  }
    
  const indexOfLastCoin = currentPage * coinsPerPage ;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoin = coins.slice(indexOfFirstCoin,indexOfLastCoin);
  

  const paginate = pageNumber => setCurrentPage(pageNumber);

    const filteredCoins = currentCoin.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
      ) 
  
  return(
    <div className="container">
      <div className="searchContainer">
        <h1 className="searchText">Search a currency</h1>
        <form >
          <input type="text" placeholder="Search...."  className="placeholderText" onChange={handleChange} />
        </form>
      </div>
      <div className="coinContainer">
        {filteredCoins.map(coin =>{
          return(
            <Coin 
              key={coin.id} 
              name={coin.name} 
              image={coin.image} 
              symbol={coin.symbol} 
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          )
        })}
      </div>
      <div className="pageContainer">
        <Page coinsPerPage={coinsPerPage} totalCoins={coins.length} paginate={paginate}/>
      </div>
    </div>
  );
};

export default App;
 
