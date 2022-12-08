export interface Manager {
  activePage: Page;
}

export enum Page {
  create = 'create',
  home = 'home',
  myCollection = 'myCollection',
  transfers = 'transfers',
}
