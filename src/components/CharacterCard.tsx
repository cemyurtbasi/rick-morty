import { memo } from 'react';
import { Character } from '../__generated__/graphql';
import { Card } from '@mui/material';

interface CharacterCardProps {
  character: Character;
}

export default memo(function CharacterCard({
  character: {
    id,
    image,
    location: { name: locationName },
    name,
  },
}: CharacterCardProps) {
  return (
    <Card className='characterCard'>
      <div className='characterCard_img'>
        <img src={image} alt={name} />
      </div>
      <div className='characterCard_info'>
        <span>
          <b>#id: </b> {id}
        </span>
        <span>
          <b>Name: </b> {name}
        </span>
        <span>
          <b>Location: </b> {locationName}
        </span>
      </div>
    </Card>
  );
});
