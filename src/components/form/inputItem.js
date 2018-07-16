import React from 'react';
import {InputItem, WhiteSpace} from 'antd-mobile';
import styles from './index.less';

const InputItemCom = (props) => {
  const {getFieldProps, getFieldError} = props.form;

	/**
	 * 普通文本输入框
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
      <InputItem
        {...getFieldProps(config.name, {
          rules: config.rules || [],
          initialValue: config.value || ''
        })}
        className={styles.inputTextRight}
        type={config.type || ''}
        key={`input-${key}`}
        placeholder={config.placeholder || ''}
        maxLength={config.maxLength || null}
        clear={config.clear ? config.clear : false}
        moneyKeyboardAlign={config.moneyKeyboardAlign || 'right'}
        onFocus={config.onFocus || null}
        onBlur={config.onBlur || null}
      >
        <span className={styles.required}>{config.required ? '*' : null}</span>
        {config.label ? config.label : null}
      </InputItem>
    );
    return (
      <div className="my-item">
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

export default InputItemCom;
