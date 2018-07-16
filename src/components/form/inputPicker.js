import React from 'react';
import {Picker, List, WhiteSpace} from 'antd-mobile';
import styles from './index.less';

const inputPicker = (props) => {
  const {getFieldProps, getFieldError} = props.form;
  /**
   * 选择框
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
      <Picker
        {...getFieldProps(config.name, {
          rules: config.rules || [],
          initialValue: config.value || null
        })}
        key={`picker-${key}`}
        cascade={config.cascade || false}
        data={config.data || []}
        cols={config.cols || 1}
      >
        <List.Item arrow="horizontal">
          <span className={styles.required}>{config.required ? '*' : ' '}</span>
          {config.label}
        </List.Item>
      </Picker>
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

export default inputPicker;
