import { FC, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Modal from 'react-modal';
import styled from '@emotion/styled'
import List from './List';
import Detail from './Detail';
import { StyledContainer, StyledPagination, StyledSearcher, StyledModal,Styled_button,Styled_alive,Styled_dead } from "../styles_components";
import { characters, character_info } from "../types"

const GET_CHARACTERS = gql`
    query characters($page: Int, $name: String) {
  characters(page:$page,filter:{name:$name}) {
    info{
      pages
    }
	results{
        id
        name
        status
        species
        type
        gender
        image
        created
    }
  }
}
`;

const Container: FC = () => {
    const [pagina, setPagina] = useState<number>(1);
    const [searchText, setSearchTex] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [info, setInfo] = useState<character_info | undefined>(undefined);
    const { loading, error, data, refetch } = useQuery<characters>(GET_CHARACTERS, {
        variables:
        {
            page: pagina,
            name: name
        },
        fetchPolicy: 'cache-and-network',
    });
    if (loading)
        return <div>Loading...</div>;
    if (error)
        return <div>Error...</div>;
    if (data) {
        console.log(data)
        return (
            <StyledContainer className='container'>
                <StyledSearcher className='submit-search'>
                    <input type="text" value={searchText} placeholder="Search Rick Morty character" onChange={(e) => setSearchTex(e.target.value)} />
                    <button onClick={() => setName(searchText)}>Search</button>
                </StyledSearcher>
                <List data={data} setInfo={setInfo} setIsOpen={setIsOpen}></List>
                <Detail info={info} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}></Detail>
                <StyledPagination className='pagination'>
                    <button onClick={() => setPagina(pagina - 1)}>Previous</button>
                    <button onClick={() => setPagina(pagina + 1)}>Next</button>
                </StyledPagination>
            </StyledContainer>
        )
    }
    return (
        <div>
        </div>
    )
}
export default Container
