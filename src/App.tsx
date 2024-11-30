import { Routes, Route } from 'react-router-dom';
import { AdminView } from './views/AdminView';
import { UserView } from './views/UserView';
import { useTileStore } from './store/tileStore';
import { useEffect } from 'react';

function App() {
  const { loadData } = useTileStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/admin" element={<AdminView />} />
        <Route path="/" element={<UserView />} />
      </Routes>
    </div>
  );
}

export default App;