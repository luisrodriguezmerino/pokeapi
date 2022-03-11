import { useEffect, useState } from "react";

function PokemonCapturados(params) {
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
      const [capturdados, setcapturados] = useState(null);
      
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
    
      const paintCaptures = async() => {
        //aqui debo obtener el array 
        const response = await fetch("https://pokeapi-bak.vercel.app/api/path/main", {});
        const resp = await response.json();
        setcapturados(resp[0].pokemonsCapturados)
      }
    
      useEffect(() => {
        llamandoALaApi();
        paintFavorites();
        paintCaptures();
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
            return (exits )
        }
      
      const capturadosVista = (name) => {
        //console.log(favorites)
        const exits =  capturdados?.includes( name ) 
        return (exits )
      }
      const onClickCapturarPokemon= async (e) => {
        const data =  e.target.value;
        console.log(data)
        var obj_datatoMongo = { "name" : data}
        const response = await fetch("https://pokeapi-bak.vercel.app/api/path/all_paths", 
        {
          method :"POST" ,
          body: JSON.stringify(obj_datatoMongo),
          headers: { "Content-Type": "application/json" },
        });
      }

  const filterVista = (name) => {
    //FIltra vista de pokemons capturados
    const exits =  capturdados?.includes( name ) 
    //console.log(exits)
    return (exits )
  }

  return (
    <>
      <div className="text-lg bg-slate-800 w-full flex justify-center text-white mb-2 mt-4">Todos tus pokemons capturados </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mx-2">
        { login ? <div className="text-lg font-bold flex justify-center"> Cargando Pokemons ... </div> :
        dataApiPokemon?.map( (todo , index) => filterVista(todo.name) == true && 
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
          {capturadosVista(todo.name) == true ?  
           <div className="grid grid-cols-4 bg-slate-800 rounded-lg my-2" >
            <img className="w-16 h-11" src="data:image/jpeg;base64,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" />
            <button className="col-span-3 text-lg bg-slate-800 text-white rounded-lg px-2" id={todo.name} key={index}>Capturado</button>
          </div>  :
          <div className="grid grid-cols-4 bg-slate-800 rounded-lg my-2" >
            <img className="w-16 h-10" src="https://w7.pngwing.com/pngs/601/774/png-transparent-pokemon-go-pikachu-poke-ball-electrode-pokemon-go-game-logo-monochrome.png" />
            <button className="col-span-3 text-lg bg-slate-800 text-white rounded-lg px-2" id={todo.name} onClick = {onClickCapturarPokemon} value={todo.name} key={index}>Capturar</button>
          </div>
          }
        </div>
        ) }        
      </div>
    </>
  );
}

export default PokemonCapturados;
