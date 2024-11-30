import { Navigation } from '../components/common/Navigation';
import { AddTileForm } from '../components/admin/AddTileForm';
import { TileGrid } from '../components/admin/TileGrid';
import { GroupManagement } from '../components/admin/GroupManagement';
import { GroupList } from '../components/admin/GroupList';
import { TileClickChart } from '../components/analytics/TileClickChart';
import { GameAnalysisChart } from '../components/analytics/GameAnalysisChart';
import { ImportData } from '../components/admin/ImportData';

export const AdminView = () => {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Navigation />
        <ImportData />
        <GameAnalysisChart />
        <TileClickChart />
        <GroupManagement />
        <GroupList />
        <AddTileForm />
        <TileGrid />
      </div>
    </div>
  );
};