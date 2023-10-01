import React, { Dispatch, useState } from 'react';
import { FilterCharacter } from '../__generated__/graphql';

interface FilterCharacterListProps {
  setFilter: Dispatch<React.SetStateAction<FilterCharacter>>;
  setPageNumber: Dispatch<React.SetStateAction<number>>;
}

const FilterCharacterList = ({
  setFilter,
  setPageNumber,
}: FilterCharacterListProps) => {
  const changeFilterControl = (e: React.FormEvent<HTMLDivElement>) => {
    setFilter({ name: (e.target as HTMLInputElement).value });
    setPageNumber(1);
  };

  return (
    <div className='filterCharacters' onChange={changeFilterControl}>
      <input type='radio' value='Rick' name='rick or morty' />
      Rick
      <input type='radio' value='Morty' name='rick or morty' />
      Morty
    </div>
  );
};

export default FilterCharacterList;
