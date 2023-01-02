export interface Manager {
  activePage: Page;
  canvasArtworkId: string | null;
  detailsPageArtworkId: string | null;
}

export enum Page {
  canvas = 'canvas',
  details = 'details',
  home = 'home',
  myCollection = 'myCollection',
  transfers = 'transfers',
}
