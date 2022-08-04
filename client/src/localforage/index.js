import localforage from 'localforage';
import config from '../config/localforage';

const client = localforage.createInstance(config);

export default client;
