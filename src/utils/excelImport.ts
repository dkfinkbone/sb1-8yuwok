import { read, utils } from 'xlsx';
import { CategoryType } from '../types/enums';
import { Group, Tile } from '../types';

interface ExcelTile {
  Description: string;
  Group: string;
  Note?: string;
  Category?: CategoryType;
}

interface ExcelGroup {
  Name: string;
  Attributes: string;
}

export interface ImportSummary {
  newGroups: number;
  newTiles: number;
  skippedTiles: number;
  errors: string[];
}

interface ImportHandlers {
  addGroup: (name: string, attributes: string[]) => Group;
  addTile: (description: string, groupId?: string | null, note?: string, category?: CategoryType) => Tile;
  groups: Group[];
  tiles: Array<{ id: string; description: string }>;
}

export const processExcelData = async (
  file: File,
  handlers: ImportHandlers
): Promise<ImportSummary> => {
  const summary: ImportSummary = {
    newGroups: 0,
    newTiles: 0,
    skippedTiles: 0,
    errors: []
  };

  try {
    const data = await file.arrayBuffer();
    const workbook = read(data);

    // Process Groups sheet first
    const groupsSheet = workbook.Sheets['Groups'];
    if (!groupsSheet) {
      summary.errors.push('Missing Groups sheet in Excel file');
      return summary;
    }

    const groupsData: ExcelGroup[] = utils.sheet_to_json(groupsSheet);
    if (groupsData.length === 0) {
      summary.errors.push('Groups sheet is empty');
    }

    // Create a map to store group name to ID mappings (case-insensitive)
    const groupNameToId = new Map<string, string>();

    // Add existing groups to the map
    handlers.groups.forEach(group => {
      groupNameToId.set(group.name.toLowerCase(), group.id);
    });

    // Process and add new groups
    for (const groupData of groupsData) {
      if (!groupData.Name) {
        summary.errors.push('Skipped group with missing name');
        continue;
      }

      const groupName = groupData.Name.trim();
      const groupNameLower = groupName.toLowerCase();

      if (!groupNameToId.has(groupNameLower)) {
        try {
          const attributes = groupData.Attributes
            ? groupData.Attributes.split(',').map(attr => attr.trim()).filter(Boolean)
            : [];

          const newGroup = handlers.addGroup(groupName, attributes);
          groupNameToId.set(groupNameLower, newGroup.id);
          summary.newGroups++;
        } catch (error) {
          summary.errors.push(`Failed to add group "${groupName}": ${error}`);
        }
      }
    }

    // Process Tiles sheet
    const tilesSheet = workbook.Sheets['Tiles'];
    if (!tilesSheet) {
      summary.errors.push('Missing Tiles sheet in Excel file');
      return summary;
    }

    const tilesData: ExcelTile[] = utils.sheet_to_json(tilesSheet);
    if (tilesData.length === 0) {
      summary.errors.push('Tiles sheet is empty');
    }

    // Track existing tile descriptions (case-insensitive)
    const existingDescriptions = new Set(
      handlers.tiles.map(t => t.description.toLowerCase())
    );

    // Process tiles
    for (const tileData of tilesData) {
      if (!tileData.Description) {
        summary.errors.push('Skipped tile with missing description');
        continue;
      }

      const description = tileData.Description.trim();
      const descriptionLower = description.toLowerCase();

      if (existingDescriptions.has(descriptionLower)) {
        summary.skippedTiles++;
        continue;
      }

      // Find the group ID using case-insensitive matching
      let groupId: string | null = null;
      if (tileData.Group) {
        const groupNameLower = tileData.Group.toLowerCase().trim();
        groupId = groupNameToId.get(groupNameLower) || null;

        if (!groupId) {
          summary.errors.push(
            `Group "${tileData.Group}" not found for tile "${description}". Tile will be created without a group.`
          );
        }
      }

      // Validate category
      let category = tileData.Category as CategoryType | undefined;
      if (tileData.Category && !Object.values(CategoryType).includes(category as CategoryType)) {
        summary.errors.push(
          `Invalid category "${tileData.Category}" for tile "${description}". Category will be ignored.`
        );
        category = undefined;
      }

      try {
        handlers.addTile(
          description,
          groupId,
          tileData.Note?.trim(),
          category
        );
        summary.newTiles++;
        existingDescriptions.add(descriptionLower);
      } catch (error) {
        summary.errors.push(`Failed to add tile "${description}": ${error}`);
      }
    }

    return summary;
  } catch (error) {
    console.error('Error processing Excel file:', error);
    summary.errors.push('Failed to process Excel file');
    return summary;
  }
};