import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '/src/components/pokedex/styles/onlypokedex.css'

const PokedexInfo = () => {

    const { id } = useParams()

    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
        axios.get(URL)
        .then(res => setPokemon(res.data))
        .catch(err => console.log(err))
    }, [id])

    console.log(pokemon)

    return (
        <div>
             <div className="home-image">
            <img className="home-image__logo" src="/Home/pokedexx.png" alt="" />
            <img className="home-image__pokebola" src="/Home/pokebola1.png" alt="" />
            </div>
            <div className="info-principal__container">
            <div className={`poke-card__header bg-${pokemon?.types[0].type.name}`}>
            <img className="info-img" src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
            
            </div>
            <article>
            <h2 className="info-id">#{id}</h2>
            <h1  className="info-name">{pokemon?.name}</h1>
            <ul className="info-container">
                <li className="info-weight__li">Weight <span className="info-weight__span">{pokemon?.weight}</span></li>
                <li className="info-height__li">Height <span className="info-height__span">{pokemon?.height}</span></li>
            </ul>
            <ul className="info-types__container">
            <li className="info-types__li"><h3 className="info-type__title">Type</h3> {pokemon?.types.map(
                type => (<p className="info-type__span">{type.type.name}</p>))}
            </li>
            <li className="info-type__li"><h3 className="info-type__title">Skills</h3> {pokemon?.abilities.map(
                e => (<p className="info-type__span1">{e.ability.name} </p> )  
            )} </li>
            </ul>
            <section>
                <h2 className="info-stats">Stats</h2>
                <h3 className="info-stats__value">{pokemon?.stats.map((e) => (
                    <ul><li className="info-value__li">{e.stat.name}: <span className="info-value__span"> {e.base_stat}</span></li>
                    </ul>
                    
                ))} </h3>
                
                <footer>
                    <div className="info-movemets__container">
                    <h2 className="info-movements__title">Movements</h2>
                    <div className="info-movemets">
                    <ul><li >{pokemon?.moves.map(e => (
                        <span className="info-movements__span">{e.move.name}   </span>
                    ))}</li></ul>
                    </div>
                    </div>
                </footer>
                 
            </section>
            </article>
            
            </div>     
                
        </div>
    ) 
}
export default PokedexInfo