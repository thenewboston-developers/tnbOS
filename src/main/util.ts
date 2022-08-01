/* eslint import/prefer-default-export: off */

import path from 'path';
import {URL} from 'url';

export const isDevelopment = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

export const resolveHtmlPath = (htmlFileName: string) => {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
};
