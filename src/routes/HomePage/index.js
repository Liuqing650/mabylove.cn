import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import TableCom from 'components/tables';
import hoc from 'components/common/LoadingHoc';
import { caclulateTextLength } from 'helper';
import styles from './index.less';

const HomePage = ({dispatch, location, home}) => {
  const { tableData } = home;

  const tabelProps = {
    tableData,
    onRefresh() {
      dispatch({
        type: 'home/getUsers',
      });
    },
    onGo() {
      dispatch(routerRedux.push('/list'));
    }
  };
  const testText = '这是一段比较平常的文字,或许没有太过美好的描述,但却能够表达出我最美好的祝愿1, 这是一段比较平常的文字,或许没有太过美好的描述,但却能够表达出我最美好的祝愿2, 这是一段比较平常的文字,或许没有太过美好的描述,但却能够表达出我最美好的祝愿3这是一段比较平常的文字,或许没有太过美好的描述,但却能够表达出我最美好的祝愿4这是一段比较平常的文字,或许没有太过美好的描述,但却能够表达出我最美好的祝愿5这是一段比较平常的文字,或许没有太过美好的描述,但却能够表达出我最美好的祝愿6这是一段比较平常的文字,或许没有太过美好的描述,但却能够表达出我最美好的祝愿7这是一段比较平常的文字,或许没有太过美好的描述,但却能够表达出我最美好的祝愿8这是一段比较平常的文字,或许没有太过美好的描述,但却能够表达出我最美好的祝愿9这是一段比较平常的文字,或许没有太过美好的描述,但却能够表达出我最美好的祝愿a这是一段比较平常的文字,或许没有太过美好的描述,但却能够表达出我最美好的祝愿b这是一段比较平常的文字,或许没有太过美好的描述,但却能够表达出我最美好的祝愿c这是一段比较平常的文字,或许没有太过美好的描述,但却能够表达出我最美好的祝愿d这是一段比较平常的文字,或许没有太过美好的描述,但却能够表达出我最美好的祝愿e';
  const handleDescText = (text) => {
    if (!text) { return '哇, 还没有创作任何内容额!!! >_<'; }
    const splitTextInfo = caclulateTextLength(text, 14, 760, 5);
    return `${text.substring(0, Math.floor(splitTextInfo.index - 10))}...`;
  };
  return (
    <div>
      <div className={styles.cardWrap}>
        <div className={`clearfix ${styles.header}`}>
          <span className={styles.title}>Title</span>
          <span className={styles.info}>2018.07.09</span>
        </div>
        <div className={styles.content}>
          <div className={styles.desc}>
            <span className={styles.tab} />
            {handleDescText(testText)}
          </div>
        </div>
        <div className={`clearfix ${styles.bottom}`}>
          <span className={styles.title}>Title</span>
          <span className={styles.info}>2018.07.09</span>
        </div>
      </div>
      <h2>HomePage</h2>
      <h4>path: {location.pathname}</h4>
      <h4>state: {home.msg}</h4>
      <TableCom {...tabelProps} />
    </div>
  );
};
export default connect(({home}) => ({home, loading: home.loading}))(hoc(HomePage));
