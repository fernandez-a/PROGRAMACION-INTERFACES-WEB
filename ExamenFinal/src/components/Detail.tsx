import { FC, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Modal from 'react-modal';
import styled from '@emotion/styled'
import { DetailProps } from "../types"
import { StyledModal, Styled_button, Styled_alive, Styled_dead } from "../styles_components";



const Detail: FC<DetailProps> = ({ info, modalIsOpen, setIsOpen }) => {
    return (
        <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} portalClassName="modal" style={{
            overlay: {
                width: '50%',
                height: '80%',
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%',
                backgroundColor: "rgba(0, 0, 0, 0)"
            },
            content: {
                padding: '0',
            }
        }}>
            <Styled_button onClick={() => setIsOpen(false)}>X</Styled_button>
            <StyledModal>
                <div className='characterCard'>
                    <img src={info?.image} alt="" />
                    <h2>{info?.name}</h2>
                    <p>{(info?.status === "Alive" || info?.status === "unknown") ? <span className='status'><Styled_alive></Styled_alive>-<p>{info?.status}</p></span> : <span className='status'><Styled_dead></Styled_dead>-<p>{info?.status}</p></span>}</p>
                    <div>
                        <p>Species: {info?.species}</p>
                    </div>
                    <div>
                        <p>
                           Gender:{info?.gender}
                        </p>
                    </div>
                    <div>
                        <p>
                           Location:{info?.location?.name}
                        </p>
                    </div>
                </div>
            </StyledModal>
        </Modal>
    )
}


export default Detail