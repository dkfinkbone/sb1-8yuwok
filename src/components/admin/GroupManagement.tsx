import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useTileStore } from '../../store/tileStore';

export const GroupManagement: React.FC = () => {
  const [groupName, setGroupName] = useState('');
  const { addGroup } = useTileStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName.trim()) {
      addGroup(groupName, []);
      setGroupName('');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Group Management</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Group
        </button>
      </form>
    </div>
  );
};