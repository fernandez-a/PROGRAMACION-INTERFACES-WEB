import styled from '@emotion/styled'

export const StyledList = styled.div`
    margin-left:20px;
    display: flex;
    flex-direction: column;
    flex-flow: row wrap;
    gap:50px;
    width:100%;
    `

export const StyledCharacter = styled.div`
    display: flex;
    flex-flow: column wrap;
    align-content: space-around;
    justify-content:center;
    align-items:center;
    img{width:130px}
`

export const StyledContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items:center;
    width:100%;
    height:90vh;
    
`

export const StyledSearcher = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    margin-top: 20px;
    height:50px;
    width:100%;
    
`
export const StyledModal = styled.div`
    display: flex;
    div{
        img{width:150px}
        display: flex;
        flex-direction: column;
        margin:20px;
        width:70%;
        span{
            display:flex;
            align-items:center;
        }
    }
    flex-flow: column wrap;
    align-items:center;
    justify-content:center;
`
export const Styled_button = styled.button`
        cursor: pointer;
        position:absolute;
        top:20px;
        right:20px;
        height: 32px;
`

export const Styled_alive = styled.span`
    display:inline-block;
    height: 0.5rem;
    width: 0.5rem;
    margin-right: 0.375rem;
    background: rgb(85, 204, 68) none repeat scroll 0% 0%;
    border-radius: 50%;

`
export const Styled_dead = styled.span`
    display:inline-block;
    height: 0.5rem;
    width: 0.5rem;
    margin-right: 0.375rem;
    background: rgb(219, 11, 11) none repeat scroll 0% 0%;
    border-radius: 50%;
`
export const StyledPagination = styled.div`
    button{width: 100px;text-align:center}
    display: flex;
    justify-content:center;
    align-items:center;
    width:100%;
    gap:20px
`


