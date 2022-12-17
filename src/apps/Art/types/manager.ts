export interface Manager {
  activePage: Page;
  detailsPageArtworkId: string | null;
  editPageArtworkId: string | null;
}

export enum Page {
  create = 'create',
  details = 'details',
  home = 'home',
  myCollection = 'myCollection',
  transfers = 'transfers',
}
