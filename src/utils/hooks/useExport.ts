import { exportDataToExcel } from '../excelExport';
import { generateExcelTemplate } from '../excelTemplate';

export const useExport = () => {
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

  const exportData = (tiles: any[], groups: any[], clicks: any[]) => {
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

  return {
    downloadTemplate,
    exportData
  };
};