import localforage from 'localforage';
import localforageConfig from '../config/localforage';

const client = localforage.createInstance(localforageConfig);

export default client;
