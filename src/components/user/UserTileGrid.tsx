import { useTileStore } from '../../store/tileStore';
import { UserTile } from './UserTile';
import { Group, Tile } from '../../types';

interface UserTileGridProps {
  selectedGroup: string | null;
}

interface GroupedTiles {
  [key: string]: {
    name: string;
    tiles: Tile[];
  };
}

export const UserTileGrid: React.FC<UserTileGridProps> = ({ selectedGroup }) => {
  const { tiles, groups, getClickStats } = useTileStore();
  const clickStats = getClickStats();

  // Create a map of click counts for quick lookup
  const clickCountMap = new Map(
    clickStats.map(stat => [stat.tileId, stat.clickCount])
  );

  // Create a map of groups for quick lookup
  const groupMap = new Map<string, Group>(
    groups.map(group => [group.id, group])
  );

  // Group tiles by category
  const groupedTiles = tiles.reduce((acc: GroupedTiles, tile) => {
    if (tile.groupId && groupMap.has(tile.groupId)) {
      const group = groupMap.get(tile.groupId)!;
      if (!acc[group.id]) {
        acc[group.id] = {
          name: group.name,
          tiles: []
        };
      }
      acc[group.id].tiles.push(tile);
    } else {
      if (!acc['ungrouped']) {
        acc['ungrouped'] = {
          name: 'Ungrouped',
          tiles: []
        };
      }
      acc['ungrouped'].tiles.push(tile);
    }
    return acc;
  }, {});

  // Sort tiles within each group by click count
  Object.values(groupedTiles).forEach(group => {
    group.tiles.sort((a, b) => {
      const aClicks = clickCountMap.get(a.id) || 0;
      const bClicks = clickCountMap.get(b.id) || 0;
      return bClicks - aClicks;
    });
  });

  // Filter by selected group if any
  const displayGroups = selectedGroup
    ? { [selectedGroup]: groupedTiles[selectedGroup] }
    : groupedTiles;

  if (Object.keys(displayGroups).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tiles available in this group
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {Object.entries(displayGroups).map(([groupId, group]) => (
        group && (
          <div key={groupId} className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{group.name}</h2>
            <div className="grid gap-3">
              {group.tiles.map(tile => (
                <UserTile
                  key={tile.id}
                  id={tile.id}
                  description={tile.description}
                  note={tile.note}
                  groupName={group.name}
                  clickCount={clickCountMap.get(tile.id) || 0}
                  category={tile.category}
                />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};