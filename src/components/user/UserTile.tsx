import { useState } from 'react';
import { useTileStore } from '../../store/tileStore';
import { getTileColor } from '../../utils/colorUtils';
import { CategoryType } from '../../types/enums';

interface UserTileProps {
  id: string;
  description: string;
  note?: string;
  groupName: string;
  clickCount: number;
  category?: CategoryType;
}

export const UserTile: React.FC<UserTileProps> = ({ 
  id, 
  description, 
  note,
  groupName,
  clickCount,
  category
}) => {
  const { recordClick, clicks } = useTileStore();
  const [showNote, setShowNote] = useState(false);
  const tileColor = getTileColor(id, clicks);

  const handleClick = () => {
    recordClick(id);
  };

  return (
    <div 
      className={`${tileColor} rounded-lg shadow-sm hover:shadow transition-all duration-300 p-3 cursor-pointer relative`}
      onClick={handleClick}
      onMouseEnter={() => setShowNote(true)}
      onMouseLeave={() => setShowNote(false)}
    >
      <div className="flex flex-col h-full">
        <p className="text-gray-800 text-sm font-medium mb-2 line-clamp-2">
          {description}
        </p>
        <div className="mt-auto text-xs text-gray-600 space-y-1">
          <div className="flex justify-between items-center">
            <span className="truncate max-w-[120px]">{groupName}</span>
            <div className="flex items-center gap-2">
              {category && (
                <span className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-medium">
                  {category}
                </span>
              )}
              <span className="font-medium">{clickCount}</span>
            </div>
          </div>
        </div>
      </div>
      
      {note && showNote && (
        <div className="absolute inset-x-0 bottom-full mb-2 px-2 z-10">
          <div className="bg-gray-900 text-white p-2 rounded-lg text-sm shadow-lg">
            {note}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="border-8 border-transparent border-t-gray-900" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};