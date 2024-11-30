import { useTileStore } from '../../store/tileStore';

interface GroupFilterProps {
  selectedGroup: string | null;
  onGroupSelect: (groupId: string | null) => void;
}

export const GroupFilter: React.FC<GroupFilterProps> = ({ selectedGroup, onGroupSelect }) => {
  const { groups } = useTileStore();

  return (
    <div className="mb-8">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onGroupSelect(null)}
          className={`px-4 py-2 rounded-md ${
            selectedGroup === null
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Tiles
        </button>
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => onGroupSelect(group.id)}
            className={`px-4 py-2 rounded-md ${
              selectedGroup === group.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {group.name}
          </button>
        ))}
      </div>
    </div>
  );
};