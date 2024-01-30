import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import createStore from './store/store.ts'
import { Provider } from 'react-redux'

console.log(window)

const data = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__


const store = createStore(data)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
