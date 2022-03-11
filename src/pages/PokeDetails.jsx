import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokeDetails() {
    let params = useParams();
    const [DetailsPokemon, setDataApiPokemon] = useState(null);
    const [Evoluciones, setEvoluciones ] = useState(null);

    const searchPokemon = async (url) => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            return data
            
        } catch (error) {
            
        }
    }
    
    const llamandoALaApi = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemondetails}`, {});
        const resp = await response.json();
        console.log(resp)
        callChainEvolution(resp.species.url)
        setDataApiPokemon(resp);
        
    };

    const requireDataEvolution = async (arr_evoluciones) => {
        
        const promises = arr_evoluciones.map(async (url_pokemons) =>{
            return await searchPokemon(`https://pokeapi.co/api/v2/pokemon/${url_pokemons.name}`)
        })
        const resultados = await Promise.all(promises)
        console.log(resultados)
        setEvoluciones(resultados)
    };
    // DetailsPokemon.species.url --> Aqui esta el url para consultar 
    const callChainEvolution = async (url) => {
            console.log(url)
            const response = await fetch(`${url}`, {});
            //${EvolutionChain?.evolution_chain.url} https://pokeapi.co/api/v2/evolution-chain/1/
            const resp = await response.json();
            console.log(resp.evolution_chain.url)
            const response_chain = await fetch(`${resp.evolution_chain.url}`, {});
            const resp_chain = await response_chain.json();
            const arr_evoluciones =[]
            arr_evoluciones.push(resp_chain.chain.species)
            //Otra evolucion 
            const test = resp_chain.chain.evolves_to[0]
            var newTest = undefined 
            test !== undefined && ( arr_evoluciones.push(test.species)  )
            test !== undefined && ( newTest = test.evolves_to[0]  )
            newTest !==undefined && (arr_evoluciones.push(newTest.species))
            console.log(arr_evoluciones)
            requireDataEvolution(arr_evoluciones)
            
    }
    

    useEffect(() => {
        llamandoALaApi();
    }, []);
    
    const EvolucionesRender = () => {
        return (
            <> 
                {Evoluciones?.map(
                    (chainEvo) => (
                    <>
                    <div className="grid justify-items-center p-2 mx-2">
                    <img className="" src = {chainEvo.sprites.front_default} alt = {chainEvo.name} />
                    <div className=" font-bold">{chainEvo.name.toUpperCase()}</div>
                    </div>
                    </>
                    )
                )}
            </>
        )
    }
    
    //dataApiPokemon?.name
  return (
    <>
      <div className="grid">
      { DetailsPokemon !== null && (
          <>
        <div className="grid lg:grid-cols-2 mt-4 border-2 border-slate-700 lg:rounded-lg">     
            <div className="flex flex-row justify-center  ">
                <img className="w-7/12  rounded" src =  {DetailsPokemon.sprites.front_default} />
            </div>   
            <div className="p-2   px-12 text-white bg-slate-700 ">
                <h1 className="flex justify-center font-bold text-xl py-2">{DetailsPokemon.name.toUpperCase()}</h1>
                <h2 className="flex justify-center font-bold text-xl py-2">INFORMACION TECNICA</h2>
                <p className="text-lg" >Numero en Podexex : #{DetailsPokemon.id}</p>
                <p className="text-lg">Experiencia Base : {DetailsPokemon.base_experience}</p>
                <p className="text-lg">Altura : {DetailsPokemon.height}" </p>
                <p className="text-lg">Peso : {DetailsPokemon.weight} kg </p>
                <div>   
                <p>Tipo :</p>
                <div className="flex flex-row justify-center">{DetailsPokemon.types.map((tipo) =>
                    <div className="m-1 px-2 border-2 rounded">{tipo.type.name.toUpperCase()}</div>
                )}</div>
                </div>
            </div>
        </div> 
        <div className="grid justify-items-center">
            <p className="bg-slate-800 w-full flex justify-center text-white mb-1 mt-2">Cadena Evolutiva</p>
            <div className="grid grid-cols-3 gap-3">
                <EvolucionesRender />  
            </div>    
        </div> 
        <div className="grid justify-items-center">
            <p className="bg-slate-800 w-full flex justify-center text-white mb-1">Habilidades Base</p>
            <div className="w-10/12 my-2 ">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 ">
                {DetailsPokemon.abilities.map((habilidades) => 
                <div className="bg-violet-700 flex justify-center text-white border-2 border-slate-900 rounded-lg py-1">{habilidades.ability.name.toUpperCase()}</div>)}
            </div> 
            </div> 
        </div>
        <div className="grid justify-items-center border-2 rounded ">
            <p className="bg-slate-800 w-full flex justify-center text-white mb-1">Diferencias de Genero</p>
            <div className="grid grid-cols-2 w-full">
                <div className="grid justify-items-center"> 
                    <p className="bg-slate-800 w-full flex justify-center text-white">Frontal</p>
                    <div className="grid grid-cols-2 w-full">
                        <div className="grid justify-items-center ">
                            <p className="bg-indigo-400 w-full flex justify-center">Macho</p>
                            <img  src =  {DetailsPokemon.sprites.front_default} />
                        </div>
                        <div className="grid justify-items-center">
                            <p className="bg-pink-400 w-full flex justify-center">Hembra</p>
                            <img src =  {DetailsPokemon.sprites.front_default} />
                        </div>
                    </div>
                </div>
                <div className="grid justify-items-center">
                    <p className="bg-slate-800 w-full flex justify-center text-white">Posterior</p>
                    <div className="grid grid-cols-2 w-full">
                        <div className="grid justify-items-center">
                            <p className="bg-indigo-400 w-full flex justify-center">Macho</p>
                            <img src =  {DetailsPokemon.sprites.back_default} />
                        </div>
                        <div className="grid justify-items-center">
                            <p className="bg-pink-400 w-full flex justify-center">Hembra</p>
                            <img src =  {DetailsPokemon.sprites.back_default} />
                        </div>
                    </div>
                </div>
            </div>
        </div>    
        <div className="grid justify-items-center">
            <p className="bg-slate-800 w-full flex justify-center text-white mb-1">Movimientos que puede aprender</p>
            <div className="w-10/12 my-2 ">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 ">
                    {DetailsPokemon.moves.map((movimientos) => 
                    <div className="bg-violet-700 flex justify-center text-white border-2 border-slate-900 rounded-lg py-1">{movimientos.move.name.toUpperCase()}</div>)}
                </div>
            </div> 
        </div>
          </>
      )}
        
      </div>
    </>
  );
}

export default PokeDetails;
