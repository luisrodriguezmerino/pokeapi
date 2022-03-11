import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokeDetails() {
    
    
    //dataApiPokemon?.name
  return (
    <>
      <div className="grid justify-items-center border-8 border-slate-900 m-6 p-6 rounded-lg">
      <div className="font-bold text-2xl my-4 ">Acerca del Proyecto </div>
      <div className = "flex flex-rows my-2 py-4 ">
        <h1 className="mx-2 px-4 font-bold text-lg">Home : </h1>
        <p className="text-lg">Funciona como pokedex llamando los pokemons registrados en la pokeapi.</p>
      </div>  
      <div className = "flex flex-rows my-2 py-4">
        <h1 className="mx-2 px-4 font-bold text-lg">Favoritos : </h1>
        <p className="text-lg">Muestras todos los pomenos favoritos (Estos son almacenados en LocalStorage).</p>
      </div>  
      <div className = "flex flex-rows my-2 py-4 ">
        <h1 className=" font-bold text-lg">Pokemons Capturados : </h1>
        <p className="text-lg">Muestra pokemons capturados en la pokedex , la diferencia con favoritos es que se almacenan en un base de datos gratuita en MongoDB.</p>
      </div>  
      </div>
    </>
  );
}

export default PokeDetails;
