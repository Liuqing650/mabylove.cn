import React, { Component, PropTypes, cloneElement } from 'react';
import styles from './styles.less';

const divStyle={
	width:300,
	marginTop:30,
	marginLeft:'auto',
	marginRight:'auto',
}
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeIndex: 0,
		};
	}

	render() {
		return (
			<div style={divStyle}>
				<div className={styles.operator}>
					<span>切换 Tab：</span>
				    <select value={this.state.activeIndex} onChange={this.handleChange}>
				        <option value="0">Tab 1</option>
				        <option value="1">Tab 2</option>
				        <option value="2">Tab 3</option>
				    </select>
				</div>
				<div className='tabs-panel'>

				</div>
			</div>
		)
	}
}

export default App;