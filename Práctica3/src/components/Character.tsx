import { get } from "http";
import React, { FC, useState } from "react";



export const Character: FC<{ name: string, birth_year: string, homeworld: string }> = ({ name, birth_year, homeworld }) => {
  return (
    <div className='info'>
      <h3 className='characterName'>{name}</h3>
      <div className='card'>
        <div className="character">
          <p>{`Year of brith : ${birth_year}`}</p>
          <p>{`Gender : ${"gender"}`}</p>
        </div>
        <div className="world">
          <p>{`Homeworld : ${homeworld}`}</p>
        </div>
      </div>
    </div>)
};
