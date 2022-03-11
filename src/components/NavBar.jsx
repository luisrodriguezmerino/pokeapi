function NavBar(){
    return(
        <nav>
            
          <a className="flex flex-row justify-center bg-red-600 py-2 " href = "/">
              <img src = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" />
          </a>
          <div className="border-y-4 border-slate-900 p-2">
            <ul className="flex flex-row gap-4 justify-center  ">
                <li className="border-l-2 px-2 border-x-slate-300"><a href="/">Home</a></li>
                <li className="border-l-2 px-2 border-x-slate-300"><a href="/favoritos">Favoritos</a></li>
                <li className="border-x-2 px-2 border-x-slate-300"><a href="pokemons-capturados">Pokemons capturados</a></li>
            </ul>
          </div>
        </nav>
    )
}

export default NavBar 