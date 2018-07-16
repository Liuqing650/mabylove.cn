import React from 'react';
import {DatePicker, List, WhiteSpace} from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
// import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
// import zhCN from 'antd-mobile/lib/date-picker/locale/zh_CN';
import styles from './index.less';

// const zhNow = moment().locale('zh-cn').utcOffset(8);
const InputDate = (props) => {
  const {getFieldProps, getFieldError} = props.form;

  // 时间转换函数
  const handleStrToDate = (strDate) => {
    if (!strDate) {
      return new Date(moment().format());
    }
    return new Date(moment(strDate).format());
  };
  // const handleDateToStr = (date) => {
  //   if (!date) {
  //     return null;
  //   }
  //   return moment(date).format('YYYY-MM-DD');
  // };

	/**
	 * 日期选择框
	 * @Params(object) config
	 * @return(arrays.Element)
	 * */
  const createInput = (config, key) => {
    const output = [];
    if (!config || Object.keys(config).length === 0) {
      return output;
    }
    if (config.space) {
      output.push(<WhiteSpace key={`space-${key}`} size={config.spaceSize || 'md'} />);
    }
    output.push(
      <DatePicker
        {...getFieldProps(config.name, {
          rules: config.rules || [],
          initialValue: handleStrToDate(config.value)
        })}
        key={`date-${key}`}
        mode={config.mode || 'date'}
        title={config.title}
        extra={config.extra || '请选择'}
      >
        <List.Item arrow="horizontal">
          <span className={styles.required}>{config.required ? '*' : ' '}</span>
          {config.label}
        </List.Item>
      </DatePicker>
    );
    return (
      <div className="dateList">
        {output}
        <div className={styles.error}>
          <span>{getFieldError(config.name)}</span>
        </div>
      </div>
    );
  };
  return (
    <div>
      {createInput(props.inputs, props.itemKey)}
    </div>
  );
};

export default InputDate;
