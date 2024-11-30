import { useState } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useTileStore } from '../../store/tileStore';

export const GroupList: React.FC = () => {
  const { groups, deleteGroup, updateGroupName } = useTileStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');

  const handleEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditedName(currentName);
  };

  const handleSave = (id: string) => {
    if (editedName.trim()) {
      updateGroupName(id, editedName.trim());
      setEditingId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      handleSave(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <div key={group.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              {editingId === group.id ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onBlur={() => handleSave(group.id)}
                  onKeyDown={(e) => handleKeyDown(e, group.id)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  autoFocus
                />
              ) : (
                <div className="flex items-center gap-2 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
                  <button
                    onClick={() => handleEdit(group.id, group.name)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
              <button
                onClick={() => deleteGroup(group.id)}
                className="text-red-500 hover:text-red-700 ml-2"
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