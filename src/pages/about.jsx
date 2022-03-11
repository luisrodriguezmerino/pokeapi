import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokeDetails() {
    
    
    //dataApiPokemon?.name
  return (
    <>
      <div className="grid  border-8 border-slate-900 m-6 p-6 rounded-lg">
      <div className="font-bold text-2xl my-4 ">Acerca del Proyecto </div>
      <div className = "grid my-2 py-4 ">
        <h1 className="xl:mx-2 xl:px-4 font-bold text-lg">Home : </h1>
        <p className="my-4 text-lg">Funciona como pokedex llamando los pokemons registrados en la pokeapi.</p>
      </div>  
      <div className = "grid my-2 py-4">
        <h1 className=" xl:mx-2 xl:px-4 font-bold text-lg">Favoritos : </h1>
        <p className="my-4 text-lg">Muestras todos los pokemons favoritos (Estos son almacenados en LocalStorage).</p>
      </div>  
      <div className = "grid my-2 py-4">
        <h1 className="xl:mx-2 xl:px-4 font-bold text-lg">Pokemons Capturados : </h1>
        <p className="my-4 text-lg">Muestra pokemons capturados en la pokedex , la diferencia con favoritos es que se almacenan en un base de datos gratuita en MongoDB.</p>
      </div>  
      </div>
    </>
  );
}

export default PokeDetails;
