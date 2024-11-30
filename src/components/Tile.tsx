import React from 'react';
import { TrashIcon, FolderIcon } from '@heroicons/react/24/outline';
import { Tile as TileType } from '../types';
import { useTileStore } from '../store/tileStore';

interface TileProps {
  tile: TileType;
  onDelete: (id: string) => void;
}

export const Tile: React.FC<TileProps> = ({ tile, onDelete }) => {
  const { groups, updateTileGroup } = useTileStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <p className="text-gray-800">{tile.description}</p>
        <button
          onClick={() => onDelete(tile.id)}
          className="text-red-500 hover:text-red-700"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <FolderIcon className="h-5 w-5 text-gray-500" />
        <select
          value={tile.groupId || ''}
          onChange={(e) => updateTileGroup(tile.id, e.target.value || null)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
        >
          <option value="">No Group</option>
          {groups.map(group => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        ID: {tile.id}
      </div>
    </div>
  );
};