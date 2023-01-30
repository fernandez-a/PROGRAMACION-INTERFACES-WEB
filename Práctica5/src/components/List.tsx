import { FC, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Modal from 'react-modal';
import styled from '@emotion/styled'
import { characters, character_info,ListProps} from "../types"
import {StyledCharacter,StyledList} from "../styles_components";



const List: FC<ListProps> = ({data,setInfo,setIsOpen}) =>  {

    return (
        <StyledList className='list'>
            {data?.characters.results.map((character: character_info) => (
                <StyledCharacter className='character' key={character.id} onClick={() => { setIsOpen(true); setInfo(character) }}>
                    <h3>{character.name}</h3>
                    <img src={character?.image} alt="" />
                </StyledCharacter>

            ))}
        </StyledList>
    )
}


export default List