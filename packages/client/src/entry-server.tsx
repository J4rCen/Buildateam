import { renderToString } from 'react-dom/server'
import App from './App'
import { Provider } from 'react-redux'
import createStore, { initialStore } from './store/store'

export function render(state = initialStore): string {
  const store = createStore(state)
  return renderToString(
    <Provider store={store}>
       <App />
    </Provider>
  )
}