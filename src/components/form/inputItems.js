import React from 'react';
import {InputItem, WhiteSpace} from 'antd-mobile';
import styles from './index.less';

const InputItems = (props) => {
  const {getFieldProps, getFieldError} = props.form;

	/**
	 * 普通文本输入框
	 * @Params(arrays) inputArrays
	 * @return(arrays.Element)
	 * */
  const createInput = (inputArrays) => {
    const output = [];
    if (!inputArrays || inputArrays.length === 0) {
      return output;
    }
    inputArrays.map((item, index) => {
      if (item.space) {
        output.push(<WhiteSpace key={`space-${index}`} size={item.spaceSize || 'md'} />);
      }
      output.push(
        <div key={index}>
          <InputItem
            {...getFieldProps(item.name, {
              rules: item.rules || []
            })}
            type={item.type}
            placeholder={item.placeholder || ''}
            clear={item.clear ? item.clear : false}
            moneyKeyboardAlign={item.moneyKeyboardAlign || 'right'}
            onFocus={item.onFocus || null}
            onBlur={item.onBlur || null}
          >
            {item.label ? item.label : null}
          </InputItem>
          <div className={styles.error}>
            <span>{getFieldError(item.name)}</span>
          </div>
        </div>
			);
      return true;
    });
    return output;
  };
  return (
    <div>
      {createInput(props.inputs)}
    </div>
  );
};

export default InputItems;
