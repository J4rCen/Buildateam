import { initialStoreType } from './store/store'

export declare global {
  interface Window {
    __PRELOADED_STATE__?: initialStoreType
  }
  declare const __SERVER_PORT__: number
}
