import { useEffect, useState } from 'react';

import {
  Character,
  Characters,
  FilterCharacter,
} from '../../__generated__/graphql';
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
  const [pageCount, setPageCount] = useState<number>(undefined);
  const [items, setItems] = useState<Character[]>([]);

  const { data, loading, error } = getAllCharacters({
    page: pageNumber,
    filter,
  });

  useEffect(() => {
    if (data && data.info) {
      setPageCount(data.info.pages);
      setHasMore(!!data.info.next);
      setItems((prevItems) => {
        return [...new Set([...prevItems, ...data.results])];
      });
    }
  }, [data, pageNumber, filter]);

  return { loading, error, hasMore, pageCount, items };
}
