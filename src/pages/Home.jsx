import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar"

function HomePages(params) {
  const searchPokemon = async (url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
        
    } catch (error) {
        
    }
}
  const [dataApiPokemon, setDataApiPokemon] = useState(null);
  const [login, setlogin] = useState(true);
  const [favorites, setFavorites] = useState(null);

  const llamandoALaApi = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {});
    const resp = await response.json();
    //console.log(resp)
    const promises = resp.results.map(async (url_pokemons) =>{
      return await searchPokemon(url_pokemons.url)
    })
    const resultados = await Promise.all(promises)
    //console.log(resultados)
    setDataApiPokemon(resultados);
    setlogin(false) ; 
  };

  const paintFavorites = async() => {
    const arr_objs = await JSON.parse(localStorage.getItem("favorite"));
    //console.log(saved_xd.object)
    const fav_array = []
    arr_objs.object.map( (fav) => fav_array.push(fav.name))
    setFavorites(fav_array)
  }

  useEffect(() => {
    llamandoALaApi();
    paintFavorites();
  }, []);

  const onClick = async (e) => {
    const data =   JSON.parse(e.target.value);

    //Declaramos el array de objetos 
    const arr_objs = []
    //Objeto nuevo
    const obj = { "name" : data.name , "id" : data.id } 
    arr_objs.push(obj)
    //Objetos viejos 
    const old_objs = JSON.parse(localStorage.getItem("favorite"));
    old_objs !== null && (old_objs.object?.map( (old) => arr_objs.push(old)))
    
    //Declaramos el Objeto a Enviar   
    const ObjetoToSend = { "object" : arr_objs }
    localStorage.setItem("favorite", JSON.stringify(ObjetoToSend) ); 

    const fav_array = []
    arr_objs.map( (fav) => fav_array.push(fav.name))
    //Reiniciamos el array de objetos agregados 
    setFavorites(fav_array)
    //console.log(obj)
    //const saved_xd = JSON.parse(localStorage.getItem("favorite"));
    //console.log(saved_xd.object)
    
    //localStorage.clear();
  }
  
  //const FavoritesVista = () => { return (<div>Hola<div>) }
  const favoritesVista = (name) => {
        //console.log(favorites)
        const exits =  favorites?.includes( name ) 
        console.log(exits)
        return (exits )
        /*
        return (exits == true ? 
        <p>{name}</p> : 
        <p> puto</p> )*/
    }
  //dataApiPokemon?.name
  return (
    <>
      <SearchBar/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mx-2">
        { login ? <div className="text-lg font-bold flex justify-center"> Cargando Pokemons ... </div> :
        dataApiPokemon?.map( (todo , index) => 
        <div className="grid justify-items-center p-2 border-2 rounded">
          <img className="" src = {todo.sprites.front_default} alt = {todo.name} />
          <div className=" font-bold">{todo.name.toUpperCase()}</div>
          <div>PokeIndex: #{todo.order}</div>
          
          <div className="flex justify-center">
            {todo.types?.map((tipo) =>
            <div className="m-1 px-2 border-2 rounded">{tipo.type.name.toUpperCase()}</div>
          )}
          </div>
          <div className="grid gap-2 grid-cols-1 xl:grid-cols-2 m-1">
           <a className="text-lg bg-red-400 text-white rounded-lg px-2 " href={`/detalles/${todo.name}`}>Ver Detalles</a>
           {favoritesVista(todo.name) == true ? 
           <button className="text-lg bg-yellow-300 text-white rounded-lg px-2" id={todo.name} onClick = {onClick} value={JSON.stringify(todo)} key={index}>Favorite 💖 </button> : 
           <button className="text-lg bg-slate-600 text-white rounded-lg px-2" id={todo.name} onClick = {onClick} value={JSON.stringify(todo)} key={index}>Favorite 🤍 </button>   }
           
          </div>
        </div>
        ) }        
      </div>
    </>
  );
}

export default HomePages;
