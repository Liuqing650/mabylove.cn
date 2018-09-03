import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classnames from 'classnames';

class Tabs extends Component {
	    constructor(props) {
		    super(props);

		    const currPorps = this.props;

		    let activeIndex = 0;
		    if ('activeIndex' in currPorps) {
			    activeIndex = currPorps.activeIndex;
		} else if ('defaultActiveIndex' in currPorps) {
			    activeIndex = currPorps.defaultActiveIndex;
		}

		    this.state = {
			    activeIndex,
			    prevIndex: activeIndex,
		}
	}


	    render() {
		    return (
		<div>
			<div className="ui-tabs">11</div>
		</div>
		)
	}
}

Tabs.propTypes = {
	className: PropTypes.string,
	classPrefix: PropTypes.string,
	onChange: PropTypes.func,
}

Tabs.defaultProps = {
	classPrefix: 'tabs',
	onChange: () => {},
};

export default Tabs;
