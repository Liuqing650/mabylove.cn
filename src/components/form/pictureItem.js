import React from 'react';
import { ImagePicker, WhiteSpace } from 'antd-mobile';

class PictureItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: props.inputs.value || []
    };
  }
  onChange = (files, type, index) => {
    // const inputs = this.props.inputs;
    // if (inputs.onChange) {
    //   inputs.handle(inputs.name, files);
    // }
  }
  // 添加图片
  onAddImageClick = (even, name) => {
    even.preventDefault();
    const { value, takePhoto } = this.props.inputs;
    console.log(5555, value);
    this.setState({
      files: this.state.files.concat({
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg'
      })
    });
    takePhoto();
    // handle();
    // Toast.error('最多只能提交3张图片。', 1);
    // if (value && value.length < 3) {
    //   // 回调图片
    //   handle();
    // } else {
    //   Toast.error('最多只能提交3张图片。', 1);
    // }
  };
  onImageClick = (index, fs) => {
    console.log(index, fs);
  };
  render() {
    /**
     * 普通文本输入框
     * @Params(object) config
     * @return(arrays.Element)
     * */
    const createListInput = (config, key) => {
      const output = [];
      const { files } = this.state;
      if (!config || Object.keys(config).length === 0) {
        return output;
      }
      if (config.space) {
        output.push(<WhiteSpace key={`space-${key}`} size={config.spaceSize || 'md'} />);
      }
      output.push(
        <div key={`input-${key}`} className="my-item">
          <ImagePicker
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => this.onImageClick(index, fs)}
            selectable={config.value.length < 3}
            onAddImageClick={this.onAddImageClick}
          />
        </div>
      );
      return output;
    };
    return (
      <div>
        {createListInput(this.props.inputs, this.props.itemKey)}
      </div>
    );
  }
}

export default PictureItem;
