import { StateCreator } from 'zustand';
import { nanoid } from 'nanoid';
import { Group } from '../../types';
import { loadGroups, saveGroups } from '../../utils/storage';

export interface GroupSlice {
  groups: Group[];
  addGroup: (name: string, attributes: string[]) => Group;
  deleteGroup: (id: string) => void;
  updateGroupName: (id: string, name: string) => void;
  loadGroups: () => Group[];
}

export const createGroupSlice: StateCreator<GroupSlice> = (set) => ({
  groups: [],
  
  addGroup: (name: string, attributes: string[]) => {
    const newGroup: Group = {
      id: nanoid(),
      name,
      attributes
    };
    
    set(state => {
      const newGroups = [...state.groups, newGroup];
      saveGroups(newGroups);
      return { groups: newGroups };
    });

    return newGroup;
  },

  deleteGroup: (id: string) => {
    set(state => {
      const newGroups = state.groups.filter(group => group.id !== id);
      saveGroups(newGroups);
      return { groups: newGroups };
    });
  },

  updateGroupName: (id: string, name: string) => {
    set(state => {
      const newGroups = state.groups.map(group =>
        group.id === id ? { ...group, name } : group
      );
      saveGroups(newGroups);
      return { groups: newGroups };
    });
  },

  loadGroups: () => {
    const groups = loadGroups();
    set({ groups });
    return groups;
  }
});