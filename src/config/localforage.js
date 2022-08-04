import localforage from 'localforage';

const localforageConfig = {
  driver: localforage.INDEXEDDB,
  name: 'tfcmap',
  version: 1,
  storeName: 'tfcmap_store',
};

export default localforageConfig;
