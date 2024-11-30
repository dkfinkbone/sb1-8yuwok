import { utils, WorkBook, write } from 'xlsx';
import { CategoryType } from '../types/enums';

export const generateExcelTemplate = (): Uint8Array => {
  const workbook: WorkBook = utils.book_new();

  // Create Groups sheet
  const groupsData = [
    { Name: 'Example Group 1', Attributes: 'attribute1, attribute2, attribute3' },
    { Name: 'Example Group 2', Attributes: 'attribute4, attribute5' }
  ];
  const groupsSheet = utils.json_to_sheet(groupsData);

  // Add column widths
  const groupsCols = [
    { wch: 20 }, // Name
    { wch: 40 }  // Attributes
  ];
  groupsSheet['!cols'] = groupsCols;

  // Create Tiles sheet
  const tilesData = [
    {
      Description: 'Example Tile 1',
      Group: 'Example Group 1',
      Note: 'This is a sample note',
      Category: CategoryType.A
    },
    {
      Description: 'Example Tile 2',
      Group: 'Example Group 2',
      Note: 'Another sample note',
      Category: CategoryType.B
    },
    {
      Description: 'Example Tile 3',
      Group: 'Example Group 1',
      Category: CategoryType.C
    }
  ];
  const tilesSheet = utils.json_to_sheet(tilesData);

  // Add column widths
  const tilesCols = [
    { wch: 30 }, // Description
    { wch: 20 }, // Group
    { wch: 40 }, // Note
    { wch: 10 }  // Category
  ];
  tilesSheet['!cols'] = tilesCols;

  // Add sheets to workbook
  utils.book_append_sheet(workbook, groupsSheet, 'Groups');
  utils.book_append_sheet(workbook, tilesSheet, 'Tiles');

  // Generate buffer
  const wbout = write(workbook, { type: 'array', bookType: 'xlsx' });
  return new Uint8Array(wbout);
};