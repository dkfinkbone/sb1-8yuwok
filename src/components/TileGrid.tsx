import React from 'react';
import { Tile } from './Tile';
import { useTileStore } from '../store/tileStore';

export const TileGrid: React.FC = () => {
  const { tiles, deleteTile } = useTileStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tiles.map(tile => (
        <Tile
          key={tile.id}
          tile={tile}
          onDelete={deleteTile}
        />
      ))}
    </div>
  );
};