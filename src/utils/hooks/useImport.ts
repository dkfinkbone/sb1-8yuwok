import { useState } from 'react';
import { processExcelData } from '../excelImport';
import { CategoryType } from '../../types/enums';
import { ImportSummary } from '../excelImport';

export const useImport = (handlers: {
  addGroup: (name: string, attributes: string[]) => void;
  addTile: (description: string, groupId?: string | null, note?: string, category?: CategoryType) => void;
  groups: any[];
  tiles: any[];
}) => {
  const [importStatus, setImportStatus] = useState<string>('');
  const [importSummary, setImportSummary] = useState<ImportSummary | null>(null);

  const handleImport = async (file: File) => {
    try {
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
  };

  return {
    importStatus,
    importSummary,
    handleImport
  };
};