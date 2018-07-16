import notFound from 'Assets/imgs/404.png';
import styles from './index.less';

export default ({
	errorText = '抱歉，暂无任何数据',
  className,
  top
}) => {
  return (
    <div className={className || styles.wrap}>
      <img className={styles.errorImg} style={{paddingTop: top || '50%'}} src={notFound} alt="not found" />
      <span className={styles.errorText}>{errorText}</span>
    </div>
  );
};
