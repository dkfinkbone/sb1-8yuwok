import { utils, WorkBook, write } from 'xlsx';
import { Tile, Group, TileClick } from '../types';
import { format } from 'date-fns';

export const exportDataToExcel = (
  tiles: Tile[],
  groups: Group[],
  clicks: TileClick[]
): Uint8Array => {
  const workbook: WorkBook = utils.book_new();

  // Export Groups
  const groupsData = groups.map(group => ({
    Name: group.name,
    Attributes: group.attributes.join(', '),
    ID: group.id
  }));
  const groupsSheet = utils.json_to_sheet(groupsData);
  utils.book_append_sheet(workbook, groupsSheet, 'Groups');

  // Export Tiles
  const tilesData = tiles.map(tile => {
    const group = groups.find(g => g.id === tile.groupId);
    return {
      Description: tile.description,
      Group: group?.name || '',
      Note: tile.note || '',
      Category: tile.category || '',
      ID: tile.id,
      CreatedAt: tile.createdAt
    };
  });
  const tilesSheet = utils.json_to_sheet(tilesData);
  utils.book_append_sheet(workbook, tilesSheet, 'Tiles');

  // Export Click Data
  const clicksData = clicks.map(click => {
    const tile = tiles.find(t => t.id === click.tileId);
    return {
      TileDescription: tile?.description || '',
      TileID: click.tileId,
      Category: click.category || '',
      Timestamp: format(new Date(click.timestamp), 'yyyy-MM-dd HH:mm:ss')
    };
  });
  const clicksSheet = utils.json_to_sheet(clicksData);
  utils.book_append_sheet(workbook, clicksSheet, 'Clicks');

  // Export Analytics
  const analyticsData = tiles.map(tile => {
    const tileClicks = clicks.filter(c => c.tileId === tile.id);
    const group = groups.find(g => g.id === tile.groupId);
    return {
      TileDescription: tile.description,
      Group: group?.name || '',
      Category: tile.category || '',
      TotalClicks: tileClicks.length,
      LastClick: tileClicks.length > 0 
        ? format(new Date(Math.max(...tileClicks.map(c => new Date(c.timestamp).getTime()))), 'yyyy-MM-dd HH:mm:ss')
        : ''
    };
  }).sort((a, b) => b.TotalClicks - a.TotalClicks);
  const analyticsSheet = utils.json_to_sheet(analyticsData);
  utils.book_append_sheet(workbook, analyticsSheet, 'Analytics');

  // Generate buffer
  const wbout = write(workbook, { type: 'array', bookType: 'xlsx' });
  return new Uint8Array(wbout);
};