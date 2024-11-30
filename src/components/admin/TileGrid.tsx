import { useState } from 'react';
import { useTileStore } from '../../store/tileStore';
import { AdminTile } from './AdminTile';
import { TileFilter } from './TileFilter';
import { CategoryType } from '../../types/enums';

export const TileGrid: React.FC = () => {
  const { tiles, deleteTile } = useTileStore();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'uncategorized' | null>(null);

  const filteredTiles = tiles.filter(tile => {
    const matchesGroup = selectedGroup
      ? selectedGroup === 'ungrouped'
        ? !tile.groupId
        : tile.groupId === selectedGroup
      : true;

    const matchesCategory = selectedCategory
      ? selectedCategory === 'uncategorized'
        ? !tile.category
        : tile.category === selectedCategory
      : true;

    return matchesGroup && matchesCategory;
  });

  return (
    <div>
      <TileFilter
        selectedGroup={selectedGroup}
        selectedCategory={selectedCategory}
        onGroupSelect={setSelectedGroup}
        onCategorySelect={setSelectedCategory}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTiles.map(tile => (
          <AdminTile
            key={tile.id}
            tile={tile}
            onDelete={deleteTile}
          />
        ))}
      </div>

      {filteredTiles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tiles match the selected filters
        </div>
      )}
    </div>
  );
};