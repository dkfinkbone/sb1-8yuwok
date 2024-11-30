import { Navigation } from '../components/common/Navigation';
import { UserTileGrid } from '../components/user/UserTileGrid';
import { GroupFilter } from '../components/user/GroupFilter';
import { useState } from 'react';

export const UserView = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Navigation />
        <GroupFilter selectedGroup={selectedGroup} onGroupSelect={setSelectedGroup} />
        <UserTileGrid selectedGroup={selectedGroup} />
      </div>
    </div>
  );
};