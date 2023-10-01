// import CharacterList from '../components/CharacterList';
import './HomePage.css';

import { Character, FilterCharacter } from '../__generated__/graphql';
import { useCallback, useRef, useState } from 'react';
import { useGetAllCharacters } from '../modules/hooks/useGetAllCharacters';
import FilterCharacterList from '../components/FilterCharacterList';
import CharacterCard from '../components/CharacterCard';
import { Grid, Skeleton } from '@mui/material';
import { LoadingSpinner } from '../components/CustomLoading';

export default function HomePage() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [filter, setFilter] = useState<FilterCharacter>({ name: 'Rick' });

  const {
    items: characters,
    loading,
    hasMore,
  } = useGetAllCharacters({
    pageNumber,
    filter,
  });

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
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  const filteredCharacters =
    //Filter to show by filter (keep all data in store)
    characters
      ?.filter((character: Character) => {
        return Object.keys(filter).every((key) => {
          const filterKeyValue = filter[key as keyof typeof filter];
          const characterKeyValue = character[
            key as keyof typeof character
          ] as string;
          return characterKeyValue.includes(filterKeyValue);
        });
      })
      //Filter by id any duplicate
      .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);

  return (
    <div className='homePage'>
      {loading ? <LoadingSpinner /> : null}
      <FilterCharacterList
        setFilter={setFilter}
        setPageNumber={setPageNumber}
      />
      <Grid container alignItems='stretch' columnSpacing={6} rowSpacing={4}>
        {loading && filteredCharacters?.length === 0
          ? [...Array(10)].map((_, i) => (
              <Grid key={i} item xs={12} sm={10} md={8} lg={6}>
                <Skeleton variant='rectangular' width={'100%'} height={168} />
              </Grid>
            ))
          : null}
        {filteredCharacters?.map((character, index) => {
          return (
            <Grid
              key={character.id}
              item
              ref={
                filteredCharacters.length === index + 1
                  ? lastItemElementRef
                  : undefined
              }
              xs={12}
              sm={10}
              md={8}
              lg={6}
            >
              <CharacterCard character={character} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
