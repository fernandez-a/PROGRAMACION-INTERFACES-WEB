import { FC, useEffect, useState } from 'react';
import { characters, character_info,ListProps} from "../types"
import {StyledCharacter,StyledList} from "../styles_components";



const List: FC<ListProps> = ({data,setInfo,setIsOpen, order}) =>  {
    let sort = [...data.characters.results]
    const sorted = (order)? sort.sort((a, b) => a.name.localeCompare(b.name)) : sort.sort((a, b) => b.name.localeCompare(a.name))
    return (
        <StyledList className='list'>
            {sort.map((character: character_info) => (
                <StyledCharacter className='character' key={character.id} onClick={() => { setIsOpen(true); setInfo(character) }}>
                    <h3>{character.name}</h3>
                    <img src={character?.image} alt="" />
                </StyledCharacter>

            ))}
        </StyledList>
    )
}


export default List