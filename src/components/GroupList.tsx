import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useTileStore } from '../store/tileStore';

export const GroupList: React.FC = () => {
  const { groups, deleteGroup } = useTileStore();

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <div key={group.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
              <button
                onClick={() => deleteGroup(group.id)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};