import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import firebaseApp from './firebase/firebase'
import store from './App/store'
import App from './App.jsx'

import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
	<Provider store={store}>
		<App tab='home' />
	</Provider>
)
