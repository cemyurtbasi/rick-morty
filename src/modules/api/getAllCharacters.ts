import { ApolloError, useQuery } from '@apollo/client';

import { getAllCharactersQuery as query } from '../queries/characters';
import { Characters, GetAllCharactersQuery, GetAllCharactersQueryVariables } from '../../__generated__/graphql';


export const getAllCharacters = (
  variables: GetAllCharactersQueryVariables
): {data: Characters; loading: boolean, error: ApolloError} => {
  const { data, loading, error } = useQuery<GetAllCharactersQuery, GetAllCharactersQueryVariables>(query, {
    variables,
  });
  
  const returnData = data?.characters as Characters;

  return { data: returnData, loading, error };
};
