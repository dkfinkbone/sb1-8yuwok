import { useMemo } from 'react';
import { useTileStore } from '../../store/tileStore';
import { CategoryType } from '../../types/enums';

interface TileFilterProps {
  selectedGroup: string | null;
  selectedCategory: CategoryType | 'uncategorized' | null;
  onGroupSelect: (groupId: string | null) => void;
  onCategorySelect: (category: CategoryType | 'uncategorized' | null) => void;
}

export const TileFilter: React.FC<TileFilterProps> = ({
  selectedGroup,
  selectedCategory,
  onGroupSelect,
  onCategorySelect,
}) => {
  const { groups } = useTileStore();
  const categories = useMemo(() => Object.values(CategoryType), []);

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="group-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Group
          </label>
          <select
            id="group-filter"
            value={selectedGroup || ''}
            onChange={(e) => onGroupSelect(e.target.value || null)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Groups</option>
            {groups.map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
            <option value="ungrouped">Ungrouped</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory || ''}
            onChange={(e) => onCategorySelect((e.target.value || null) as CategoryType | 'uncategorized' | null)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                Category {category}
              </option>
            ))}
            <option value="uncategorized">Uncategorized</option>
          </select>
        </div>
      </div>
    </div>
  );
};