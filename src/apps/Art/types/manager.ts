export interface Manager {
  activePage: Page;
}

export enum Page {
  create = 'create',
  details = 'details',
  home = 'home',
  myCollection = 'myCollection',
  transfers = 'transfers',
}
