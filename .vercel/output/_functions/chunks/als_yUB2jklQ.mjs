import { AsyncLocalStorage } from 'node:async_hooks';

const als = new AsyncLocalStorage;

export { als as a };
