import React from 'react';
import {Icon} from 'antd';
import styles from './praticeStyle.less';

const practiceHtmlShow = ({
	htmlValue,
	closeDebug,
}) => {
	function createMarkup() {
	  return {__html: htmlValue}; 
	};
	return (
		<div className={styles.debugStyle}>
			<div className={styles.debugtop} >
				<Icon className={styles.debugCloseIcon} onClick={closeDebug} type="close-circle-o" />
				<pre>
					<div dangerouslySetInnerHTML={createMarkup()} />
				</pre>
			</div>
		</div>
	)
}

export default practiceHtmlShow;