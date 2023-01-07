import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PokeCard from "../components/pokedex/PokeCard";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/pokedex/Pagination";
import '/src/components/pokedex/styles/pokedex.css'

const Pokedex = () => {

 const { trainer } = useSelector(state => state)

 const [pokemons, setPokemons] = useState()

 const [types, setTypes] = useState()

 const [typeSelected, setTypeSelected] = useState('All pokemons')

 const navigate = useNavigate()

 

 useEffect(() => {
    if(typeSelected !== 'All pokemons') {
        axios.get(typeSelected)
        .then(res => setPokemons(res.data.pokemon.map(e => e.pokemon)))
        .catch(err => console.log(err))
    }
    else {
        const URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10000'
    axios.get(URL)
    .then(res => setPokemons(res.data.results))
    .catch(err => console.log(err)) 
    }
    
 }, [typeSelected])

 useEffect(() => {
    
    const URL = 'https://pokeapi.co/api/v2/type'
    axios.get(URL)
    .then(res => setTypes(res.data.results))
    .catch(err => console.log(err) )
 }, [])

 const handleSubmit = event => {
    event.preventDefault()
    navigate(`/pokedex/${event.target.search.value.trim().toLowerCase()}`)

 }

 const handleChange = e => { 
    setTypeSelected(e.target.value)
    setPage(1)
}

 const [page, setPage] = useState(1)

 const [pokePerPage, setPokePerPage] = useState(8)

 const initialPoke =  (page - 1) * pokePerPage

 const finalPoke = page * pokePerPage

 const maxPage = pokemons && Math.ceil(pokemons.length / pokePerPage)

    return(

        <div>
            <div className="home-image">
            <img className="home-image__logo" src="/Home/pokedexx.png" alt="" />
            <img className="home-image__pokebola" src="/Home/pokebola1.png" alt="" />
            </div>
            <h2 className="pokedex-title__trainer">Welcome {trainer}, here you can find your favorite pokemon.</h2>
            <form className="pokedex-form__form" onSubmit={handleSubmit}>
                <input className="pokedex-form__input" id="search" type="text" />
                <button className="pokedex-form__button" >Search</button>
            </form>
            <select className="pokedex-select" onChange={handleChange}>
                <option className="pokedex-select__value" value='All pokemons'>All pokemons</option>
                {
                    types?.map(type => ( 
                      <option key={type.url} value={type.url}>{type.name}</option>  
                    ))
                }
            </select>
            <Pagination  page={page} maxPage={maxPage} setPage={setPage}/>
            <div className="poke-container">
                {
                    pokemons?.slice(initialPoke, finalPoke).map(pokemon => (
                        <PokeCard 
                        key={pokemon.url}
                        url={pokemon.url}
                        />
                    ))
                }
            </div>
            <Pagination  page={page} maxPage={maxPage} setPage={setPage}/>
        </div>
    )

}
export default Pokedex  