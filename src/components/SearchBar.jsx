import { useEffect, useState } from "react";

function SearchBar() {
    const [search, setSearch] = useState(null);
    const [datafinded, setdatafinded] = useState(null);


    const searchPokemon = async (pokemon) => {
        try {
            let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            return data
            
        } catch (error) {

        }
    }

    const onChange = (e) =>{
        console.log(e.target.value)
        setSearch(e.target.value.toLowerCase())
    }

    const onClick = async (e) => {
        const data = await searchPokemon(search)
        console.log(data)
        setdatafinded(data)
    }

    return (
        <>
            <div className="grid grid-cols-2 mx-2 py-2">
                <input className="border-2 p-1"
                placeholder=" Buscar pokemon ..." 
                onChange={onChange}
                />
                <div>
                    <button className="w-full border-2 bg-slate-700 rounded text-white  py-2" onClick = {onClick} >Buscar </button>
                </div>
                
            </div>
            <div className="grid justify-center">   
                {   
                    datafinded === undefined ?   (
                        <div className="font-bold text-lg m-3">No se encontraron Pokemones</div>             
                    )
                    : 
                    (
                        datafinded !== null && (
                            <> 
                                <h1 className="font-bold text-lg m-3">Pokemon Encontrado !!! </h1>
                                <div className="grid justify-items-center p-2 border-2 rounded my-4">
                                    <img className="" src = {datafinded.sprites.front_default} alt = {datafinded.name} />
                                    <div className=" font-bold">{datafinded.name.toUpperCase()}</div>
                                    <div>PokeIndex: #{datafinded.order}</div>
                                    
                                    <div className="flex justify-center">
                                        {datafinded.types?.map((tipo) =>
                                        <div className="m-1 px-2 border-2 rounded">{tipo.type.name.toUpperCase()}</div>
                                    )}
                                    </div>
                                    <a className="text-lg bg-red-400 text-white rounded-lg px-2 m-1" href={`/detalles/${datafinded.name}`}>Ver Detalles</a>
                                </div>
                            </>  
                        )
                    )

                }
            </div>
        </>        
    )
}

export default SearchBar