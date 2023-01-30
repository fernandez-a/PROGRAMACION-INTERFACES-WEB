import React, { FC, useState, useEffect } from "react";
import { Character } from "./Character";

type character = {
  name: string;
  birth_year: string;
  homeworld: string;
  id: string;
};


// const characters: Character[] = await Promise.all(
//   charactersAPI.map(async (charAPI) => {
//     const episodes: Episode[] = await getEpisodes(charAPI.episode);
//     return {
//       ...charAPI,
//       episode: episodes.map((epi) => {
//         return {
//           name: epi.name,
//           episode: epi.episode,
//         };
//       }),
//     };
//   })
// );



export const ListCharacters: FC = () => {
  const getCharacters = async (name: string) => {
    try {
      let response = await fetch(
        `https://swapi.dev/api/people/?search=${name}`
      );
      let characterJSon = await response.json();
      setChars(characterJSon.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getWorld = async (clave: number) => {
    try {
      let homeworld = chars[clave].homeworld;
      let home = await fetch(homeworld);
      let home_name = await home.json();
      console.log(home_name);
      setHome(home_name.name); 
    } catch (error) {
      console.log(error);
    }
  }

  let [chars, setChars] = useState<character[]>([]);
  let [valor, setValor] = useState<string>("");
  let [home, setHome] = useState<string>("");
  let [clave, setClave] = useState<number>(0);

  useEffect(() => {
    getCharacters(valor);
    getWorld(clave);
  }, [])

  return (
    <div className="App">
      <div className="body">
        <div className="list">
          <div id="searcher">
            <input className="form-control" type="text" placeholder="Star wars character" value={valor} onChange={(e) => setValor(e.target.value)}></input>
            <button type="submit" id="searchButton" onClick={() => { 
              getCharacters(valor);
              getWorld(clave);
              }}>Search</button>
          </div>
          <div className="listCharacters">
          {(chars.length>0)?chars.map((char, index) =>
            <div onClick={() => {
              setClave(index);
              getWorld(clave)}} >
            <p className='characterList'>{char.name}</p>
            </div>):<h2>Loading...</h2>}
          </div>
        </div>
        <div className="infoCharacter">
          {(chars.length>0)?<Character key={chars[clave].id} name={chars[clave].name} birth_year={chars[clave].birth_year} homeworld = {home} />:<h1 className='characterName'>Not Found</h1>}
        </div>
      </div>
    </div>
  );
};
