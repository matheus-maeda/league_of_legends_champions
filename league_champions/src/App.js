import React, {useState, useEffect} from 'react';
import ChampionRow from './components/ChampionRow.jsx'
import Header from "./components/Header.jsx"
export default () => {

  const [getChampions, setChampions] = useState([])
  
  useEffect(() => {
        let champions = []
        fetch('https://ddragon.leagueoflegends.com/cdn/12.15.1/data/pt_BR/champion.json').then(response => response.json()).then(function(response) {
            champions = Object.keys(response.data).map((key) => [response.data[key]]);
            setChampions(champions)
        })
  },[])

  return (
    <div className='App'>
        <Header />
      <ChampionRow champions={getChampions} />
    </div>
  );
}