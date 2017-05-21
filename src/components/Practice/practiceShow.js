import React from 'react';
import {Icon} from 'antd';
import styles from './praticeStyle.less';

const practiceShow = ({
	debugValue,
	closeDebug,
}) => {
	return (
		<div className={styles.debugStyle}>
			<div className={styles.debugtop} >
				<Icon className={styles.debugCloseIcon} onClick={closeDebug} type="close-circle-o" />
				<div className={styles.debugcontent}>
					{debugValue}
				</div>
			</div>
		</div>
	);
}

export default practiceShow;