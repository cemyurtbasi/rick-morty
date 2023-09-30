import { gql } from '@apollo/client';

export const getAllCharactersQuery = gql (/* GraphQL */ `
    query GetAllCharacters($page: Int!, $filter: FilterCharacter) {
        characters (page: $page, filter: $filter)  {
            info { 
                next, 
                pages
            }
            results {
                id,
                name,
                location {name},
                image
            } 
        } 
    }
`);