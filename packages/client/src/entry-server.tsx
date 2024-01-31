import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { Provider } from 'react-redux'
import createStore, { initialStore } from './store/store'

export function render(state = initialStore) {
  const store = createStore(state)
  return renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
  )
}