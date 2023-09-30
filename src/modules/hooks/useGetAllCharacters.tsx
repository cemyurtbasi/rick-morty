import { useEffect, useRef, useState } from 'react';

import { Character, FilterCharacter } from '../../__generated__/graphql';
import { getAllCharacters } from '../api/getAllCharacters';

interface GetAllCharactersProps {
  pageNumber: number;
  filter?: FilterCharacter;
}

export function useGetAllCharacters({
  pageNumber,
  filter,
}: GetAllCharactersProps) {
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [items, setItems] = useState<Character[]>([]);
  const first = useRef(filter);

  const { data, loading, error } = getAllCharacters({
    page: pageNumber,
    filter,
  });

  useEffect(() => {
    if (data && data.info) {
      setHasMore(!!data.info.next);
      setItems((prevItems) => {
        if (first.current !== filter) {
          first.current = filter;
          return data.results;
        }
        return [...new Set([...prevItems, ...data.results])];
      });
    }
  }, [data, pageNumber, filter]);

  return { loading, error, hasMore, items };
}
