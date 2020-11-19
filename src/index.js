import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import Amplify from '@aws-amplify/core'
import awsConfig from './aws-exports'
import reportWebVitals from './reportWebVitals'

if (process.env.REACT_APP_API_MODE === 'amplify') Amplify.configure(awsConfig)

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorkerRegistration.register()
reportWebVitals()
