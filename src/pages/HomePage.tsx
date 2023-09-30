// import CharacterList from '../components/CharacterList';
import './HomePage.css';

import { FilterCharacter } from '../__generated__/graphql';
import { useCallback, useRef, useState } from 'react';
import { useGetAllCharacters } from '../modules/hooks/useGetAllCharacters';
import FilterCharacterList from '../components/FilterCharacterList';
import CharacterCard from '../components/CharacterCard';

export default function HomePage() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [filter, setFilter] = useState<FilterCharacter>({ name: 'Rick' });

  const {
    items: characters,
    loading,
    pageCount,
    error,
    hasMore,
  } = useGetAllCharacters({
    pageNumber,
    filter,
  });

  console.log({ characters, loading, pageCount, error, hasMore });

  // Infinite Scroll
  const observer = useRef(null);
  const lastItemElementRef = useCallback(
    (node: HTMLElement) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(pageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, pageNumber]
  );

  return (
    <div className='homePage'>
      <div className='homePage_filter'>
        <FilterCharacterList />
      </div>
      <div className='homePage_list'>
        {characters &&
          characters.map((character, index) => {
            return (
              <article
                key={character.id}
                ref={
                  characters.length === index + 1
                    ? lastItemElementRef
                    : undefined
                }
              >
                <CharacterCard character={character} />
              </article>
            );
          })}
      </div>
    </div>
  );
}
