import React, { useState } from 'react';
import { useTileStore } from '../store/tileStore';

export const AddTileForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [groupId, setGroupId] = useState('');
  const { addTile, groups } = useTileStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      addTile(description, groupId || undefined);
      setDescription('');
      setGroupId('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter tile description"
        />
      </div>
      
      <div>
        <label htmlFor="group" className="block text-sm font-medium text-gray-700">
          Group
        </label>
        <select
          id="group"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">No Group</option>
          {groups.map(group => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add Tile
      </button>
    </form>
  );
};