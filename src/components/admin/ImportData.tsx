import { ChangeEvent, useState } from 'react';
import { read, utils } from 'xlsx';
import { useTileStore } from '../../store/tileStore';
import { generateExcelTemplate } from '../../utils/excelTemplate';
import { exportDataToExcel } from '../../utils/excelExport';
import { processExcelData } from '../../utils/excelImport';
import { CategoryType } from '../../types/enums';

export const ImportData = () => {
  const { addTile, addGroup, groups, tiles, clicks } = useTileStore();
  const [importStatus, setImportStatus] = useState<string>('');
  const [importSummary, setImportSummary] = useState<any>(null);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const handlers = {
          addGroup: (name: string, attributes: string[]) => {
            return addGroup(name, attributes);
          },
          addTile: (description: string, groupId?: string | null, note?: string, category?: CategoryType) => {
            return addTile(description, groupId, note, category);
          },
          groups,
          tiles
        };

        const summary = await processExcelData(file, handlers);
        setImportSummary(summary);
        setImportStatus(
          summary.errors.length === 0
            ? 'Data imported successfully!'
            : 'Import completed with some issues'
        );

        setTimeout(() => {
          setImportStatus('');
          setImportSummary(null);
        }, 5000);
      } catch (error) {
        console.error('Error importing data:', error);
        setImportStatus('Error importing data. Please check the file format.');
      }
    }
  };

  const downloadTemplate = () => {
    const template = generateExcelTemplate();
    const blob = new Blob([template], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tile-management-template.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportData = () => {
    const data = exportDataToExcel(tiles, groups, clicks);
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().split('T')[0];
    const a = document.createElement('a');
    a.href = url;
    a.download = `tile-management-export-${timestamp}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mb-8">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Import/Export Data</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={downloadTemplate}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Download Template
            </button>
            <button
              onClick={exportData}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Export Current Data
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Excel File
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
          </div>

          {importStatus && (
            <div className={`text-sm ${
              importStatus.includes('Error') || importStatus.includes('issues')
                ? 'text-red-600'
                : 'text-green-600'
            }`}>
              {importStatus}
            </div>
          )}

          {importSummary && (
            <div className="bg-gray-50 p-4 rounded-lg text-sm">
              <h3 className="font-medium text-gray-900 mb-2">Import Summary</h3>
              <ul className="space-y-1">
                <li>New groups added: {importSummary.newGroups}</li>
                <li>New tiles added: {importSummary.newTiles}</li>
                <li>Skipped existing tiles: {importSummary.skippedTiles}</li>
                {importSummary.errors.length > 0 && (
                  <li className="text-red-600 mt-2">
                    <div className="font-medium">Errors:</div>
                    <ul className="list-disc list-inside">
                      {importSummary.errors.map((error: string, index: number) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className="text-sm text-gray-600">
            <p className="font-medium mb-2">Excel Format Instructions:</p>
            <p>Sheet 1 (Groups):</p>
            <ul className="list-disc list-inside ml-4 mb-2">
              <li>Name: Group name</li>
              <li>Attributes: Comma-separated list of attributes</li>
            </ul>
            <p>Sheet 2 (Tiles):</p>
            <ul className="list-disc list-inside ml-4">
              <li>Description: Tile description</li>
              <li>Group: Group name (must match a group from Groups sheet)</li>
              <li>Note: Optional note text</li>
              <li>Category: Optional category (A, B, or C)</li>
            </ul>
            <p className="mt-2 text-sm text-indigo-600">
              Tip: Download the template for an example of the correct format
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};