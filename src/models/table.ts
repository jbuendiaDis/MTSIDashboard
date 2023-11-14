import { ReactNode } from 'react';

export interface Column {
  id: string;
  label: string;
  align: 'left' | 'right' | 'center';
  actions?: Action[];
}

export interface Action {
  label: string;
  icon: ReactNode;
  onClick: (rowData: Row) => void;
}

export interface Row {
  [key: string]: string | number;
}

export interface SortData {
  activeColumn: string;
  direction: 'asc' | 'desc';
}

export interface TableToolbarProps {
  showCheckboxes: boolean;
  searchTerm: string;
  handleSearch: (event: any) => void;
  selectedRows: any;
  handleDeleteSelected: () => void;
}
