import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokeThumb from './components/PokeThumb';




const App = () => {
const [allPokemons, setAllPokemons] = useState([])
const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=10")
const [pokemon, setPokemon] =useState("");
const [pokemonData, setPokemonData] =useState([]);
const [pokemonType, setPokemonType] =useState("");
const getAllPokemons = async()=>{
  const res = await fetch(loadMore)
  const data = await res.json()
  setLoadMore(data.next)

  function createPokemonObject(result){
    result.forEach(async (pokemon)=>{
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      const data = await res.json()
      setAllPokemons(currentList => [...currentList, data])
      
    })
  }
  createPokemonObject(data.results)
  await console.log(allPokemons)
}
useEffect(()=>{
  getAllPokemons()
}, [])

const getPokemon = async ()=>{
  const toArray=[];
  try{
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const res = await axios.get(url);
    toArray.push(res.data);
    setPokemonType(res.data.types[0].type.name)
    setPokemonData(toArray)
  } catch(e){
    console.log(e);
  }
};
const handleChange = (e) => {
  setPokemon(e.target.value.toLowerCase());
};
const handleSubmit = (e) => {
  e.preventDefault();
  getPokemon();
}
  return (
    <div className='App'>
      <div id="cover">
      <form onSubmit={handleSubmit}>
        <div className='tb'>
          <div className='td'>
          <input type="text" onChange={handleChange} placeholder="Enter Pokemon Name" required/>
          </div>
          <div className='td' id="s-cover">
          <button type="submit" className="sp" >
            <div id="s-circle"></div>
            <span></span>
          </button>
          </div>
        </div>
      </form>
      </div>
      {pokemonData.map((data) => {
        return(
          <div className='container'>
            <img src={data.sprites["front_default"]}/>
            <div className='divTable'>
              <div className='divTableBody'>
              <div className='divTableRow'>
                <div className='divTableCell'>Type</div>
                <div className='divTableCell'>{pokemonType}</div>
              </div>
              <div className='divTableRow'>
                <div className='divTableCell'>Height</div>
                <div className='divTableCell'>
                  {" "}
                  {Math.round(data.height*3.9)} "
                </div>
              </div>
              <div className='divTableRow'>
                <div className='divTableCell'>Weight</div>
                <div className='divTableCell'>
                {" "}
                {Math.round(data.weight/4.3)} lbs
                </div>
              </div>
              <div className='divTableRow'>
                <div className='divTableCell'>Number of Battle</div>
                <div className='divTableCell'>{data.game_indices.length}</div>
              </div>
            </div>
            </div>
          </div>
        );
      })}
      <h1>Pokemon Evolutions</h1>
      <div className='pokemon-container'>
        <div className='all-container'>
          {allPokemons.map((pokemon, index) => 
          <PokeThumb
          id={pokemon.id}
          name={pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}
          image={pokemon.sprites["front_default"]}
          type={pokemon.types[0].type.name}
          key={index}
          />
          )}

        </div>
        <button className='lm' variant="outlined" onClick={() => getAllPokemons()}>Load More....</button>
        
      </div>
    </div>
  );
}

export default App;
