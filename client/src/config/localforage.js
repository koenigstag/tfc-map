import localforage from 'localforage';

export default {
  driver: localforage.INDEXEDDB,
  name: 'tfcmap',
  version: 1,
  storeName: 'tfcmap_store',
};
