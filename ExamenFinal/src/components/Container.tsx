import { FC, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Modal from 'react-modal';
import styled from '@emotion/styled'
import List from './List';
import Detail from './Detail';
import { StyledContainer, StyledPagination, StyledSearcher, StyledModal, Styled_button, Styled_alive, Styled_dead, StyledOrder, StyledFilters } from "../styles_components";
import { characters, character_info } from "../types"

const GET_CHARACTERS = gql`
    query characters($page: Int, $name: String,$status:String,$gender:String) {
  characters(page:$page,filter:{name:$name,status:$status,gender:$gender}) {
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
    const [status, setStatus] = useState<string>("")
    const [gender, setGender] = useState<string>("")
    const [searchText, setSearchTex] = useState<string>("");
    const [checkedState, setCheckedState] = new Array(3).fill(false)
    const [order, setOrder] = useState<boolean>(true);
    const [checked, setChecked] = useState<boolean>(false)
    const [searchStatus, setSearchStatus] = useState<string>("");
    const [searchGender, setSearchGender] = useState<string>("");
    const [searchMultiple, setSearchMultiple] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [info, setInfo] = useState<character_info | undefined>(undefined);
    console.log(searchText)
    const { loading, error, data, refetch } = useQuery<characters>(GET_CHARACTERS, {
        variables:
        {
            page: pagina,
            name: name,
            status: status,
            gender: gender
        },
        fetchPolicy: 'cache-and-network',
    });
    if (loading)
        return <div>Loading...</div>;
    if (error) {
        return <div>No more characters to show...</div>;
    }
    if (data) {
        return (
            //make a checkbox button with multi sellector  
            <StyledContainer className='container'>
                {/* <div className="topping">
                    <input type="checkbox" id="topping" name="topping"
                        value="Alive" onChange={() => {setStatus('alive'); setChecked(!checked)}}/>
                    Alive
                    <input type="checkbox" id="topping" name="topping"
                        value="Dead" onClick={() => {setChecked(!checked); setStatus('dead')}}/>
                    Dead
                </div> */}
                <StyledSearcher className='submit-search'>
                    <button onClick={() => setOrder(true)}>A-Z</button>
                    <input type="text" value={searchText} placeholder="Search Rick Morty character" onChange={(e) => setSearchTex(e.target.value)} />
                    <button onClick={() => { setGender(searchGender); setName(searchText); setStatus(searchStatus)}}>Search</button>
                    <button onClick={() => setOrder(false)}>Z-A</button>
                </StyledSearcher>
                <StyledFilters>
                    <input type="text" value={searchStatus} placeholder="Search status dead || alive" onChange={(e) => setSearchStatus(e.target.value)} />
                    <button onClick={() => setStatus(searchStatus)}>Search</button>
                    <input type="text" value={searchGender} placeholder="Search gender male || female" onChange={(e) => setSearchGender(e.target.value)} />
                    <button onClick={() =>{ setGender(searchGender); setName(searchText); setStatus(status)}}>Search</button>

                </StyledFilters>
                <div>

                </div>
                <List data={data} setInfo={setInfo} setIsOpen={setIsOpen} order={order}></List>
                <Detail info={info} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}></Detail>
                <StyledPagination className='pagination'>
                    <button onClick={() => setPagina((pagina === 0) ? 0 : pagina - 1)}>Previous</button>
                    {pagina}/20
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
