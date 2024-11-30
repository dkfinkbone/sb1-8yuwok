import { useState } from 'react';
import { TrashIcon, FolderIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Tile } from '../../types';
import { CategoryType } from '../../types/enums';
import { useTileStore } from '../../store/tileStore';

interface AdminTileProps {
  tile: Tile;
  onDelete: (id: string) => void;
}

export const AdminTile: React.FC<AdminTileProps> = ({ tile, onDelete }) => {
  const { groups, updateTileGroup, updateTileDescription, updateTileNote, updateTileCategory } = useTileStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(tile.description);
  const [editedNote, setEditedNote] = useState(tile.note || '');

  const handleSave = () => {
    if (editedDescription.trim()) {
      updateTileDescription(tile.id, editedDescription.trim());
      updateTileNote(tile.id, editedNote.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && e.target instanceof HTMLInputElement) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedDescription(tile.description);
      setEditedNote(tile.note || '');
      setIsEditing(false);
    }
  };

  const handleNoteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && e.ctrlKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedDescription(tile.description);
      setEditedNote(tile.note || '');
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        {isEditing ? (
          <form 
            className="flex-1 space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Description"
              autoFocus
            />
            <textarea
              value={editedNote}
              onChange={(e) => setEditedNote(e.target.value)}
              onKeyDown={handleNoteKeyDown}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Add a note (optional)"
              rows={2}
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditedDescription(tile.description);
                  setEditedNote(tile.note || '');
                  setIsEditing(false);
                }}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center gap-2 flex-1">
            <div>
              <p className="text-gray-800">{tile.description}</p>
              {tile.note && (
                <p className="text-sm text-gray-500 mt-1">{tile.note}</p>
              )}
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        <button
          onClick={() => onDelete(tile.id)}
          className="text-red-500 hover:text-red-700 ml-2"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
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

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Category:</label>
          <select
            value={tile.category || ''}
            onChange={(e) => updateTileCategory(tile.id, e.target.value as CategoryType)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="">None</option>
            {Object.values(CategoryType).map(category => (
              <option key={category} value={category}>
                Category {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        ID: {tile.id}
      </div>
    </div>
  );
};