export type characters = {
    characters: {
        info: {
            pages: number,
        }
        results: Array<
            {
                id: number,
                name: string
                status: string
                species: string
                type: string
                gender: string
                image: string
                created: string
            }
        >
    }
}


export type character_info = {
    id: number,
    name: string
    status: string
    species: string
    gender: string
    image: string
    created: string
}

export type ListProps = {
    data : characters,
    setInfo: (info:character_info|undefined) => void,
    setIsOpen: (open:boolean) => void
}

export type DetailProps = {
    info : character_info | undefined,
    modalIsOpen: boolean,
    setIsOpen: (open:boolean) => void
}