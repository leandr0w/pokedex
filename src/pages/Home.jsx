import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTrainerGlobal } from "../store/slices/trainer.slice"
import '/src/components/pokedex/styles/home.css'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSbumit = e => {
        e.preventDefault()
        dispatch(setTrainerGlobal(e.target.name.value.trim()))
        e.target.name.value= ''
        navigate('/pokedex')
    }

    return (
        
        <div>
        <div className="home-image">
        <img className="home-image__logo" src="/Home/pokedexx.png" alt="pokedexlogo" />
        <img className="home-image__pokebola" src="/Home/pokebola1.png" alt="" />
        </div>
        <div className="home-container__principal">
        <h1 className="home-title__trainer">Hi Trainer!</h1>
        <div className="home-container__trainer">
        <img className="home-image__trainer" src="/Home/trainer.png" alt="trainerpokemon" />
        </div>
        </div>
        
        <p className="home-start">Give me your name to start</p>
        <form className="home-form" onSubmit={handleSbumit}>
            <input className="home-input" id="name" type="text"/>
            <button className="home-button">Start</button>
        
        </form>
        </div>
       
    )
}
export default Home