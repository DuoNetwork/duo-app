import '@babel/polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import D3Chart from './D3Chart'
import './style.css'
const data = require("./MockData.json")

class Root extends React.PureComponent {
	render() {
		return (
            <div className="d3chart-container">
                <h3>D3 Chart</h3>
                <D3Chart data={data} />
                <br />
            </div>
		)
	}
}

ReactDOM.render(<Root />, document.getElementById('root'))
