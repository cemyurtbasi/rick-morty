import React, { Dispatch } from 'react';
import { FilterCharacter } from '../__generated__/graphql';
interface FilterCharacterListProps {
  setFilter: Dispatch<React.SetStateAction<FilterCharacter>>;
  setPageNumber: Dispatch<React.SetStateAction<number>>;
}

const FilterCharacterList = ({
  setFilter,
  setPageNumber,
}: FilterCharacterListProps) => {
  const changeFilterControl = (event: React.FormEvent<HTMLDivElement>) => {
    setFilter({ name: (event.target as HTMLInputElement).value });
    setPageNumber(1);
  };
  return (
    <div className='filterCharacters' onChange={(e) => changeFilterControl(e)}>
      <input type='radio' value='Rick' name='gender' /> Rick
      <input type='radio' value='Morty' name='gender' /> Morty
    </div>
  );
};

export default FilterCharacterList;
