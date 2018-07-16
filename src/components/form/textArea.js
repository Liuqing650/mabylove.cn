import React from 'react';
import {TextareaItem, WhiteSpace} from 'antd-mobile';
import styles from './index.less';

const TextArea = (props) => {
  const {getFieldProps, getFieldError} = props.form;

	/**
	 * 多行文本输入框
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
      <TextareaItem
        {...getFieldProps(config.name, {
          rules: config.rules || [],
          initialValue: config.value || ''
        })}
        title={config.label ? <label>{config.required ? <span className={styles.required}>*</span> : null}{config.label}</label> : null}
        rows={config.rows || 1}
        key={`text-area-${key}`}
        clear={config.clear || false}
        placeholder={config.placeholder || ''}
        onFocus={config.onFocus || null}
        onBlur={config.onBlur || null}
      />
    );
    return (
      <div className="my-item">
        <div className={styles.textAreaStyle}>
          {output}
        </div>
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

export default TextArea;
