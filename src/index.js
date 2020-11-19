import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import Amplify from '@aws-amplify/core'
import awsConfig from './aws-exports'

if (process.env.REACT_APP_API_MODE === 'amplify') Amplify.configure(awsConfig)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
