import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import './assets/css/reset.css'

import App from './pages/App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
