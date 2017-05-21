import React from 'react';
import { request,config} from '../../utils';
import qs from 'qs';
import {
  ImageSideButton,
  Block,
  addNewBlock,
  createEditorState,
  Editor,
} from 'medium-draft';
import 'medium-draft/lib/index.css';
import 'isomorphic-fetch';

class CustomImageSideButton extends ImageSideButton {
  
  /*
  We will only check for first file and also whether
  it is an image or not.
  */
  onChange(e) {
    const file = e.target.files[0];
    console.log('file.type=======>>',file.type)
    if (file.type.indexOf('image/') === 0) {
      // This is a post request to server endpoint with image as `image`
      console.log('file=======>>',file)
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      console.log('formData=====>>',formData)
      fetch(config.host+'/upload/uploadFile', {
        method: 'POST',
        body: formData,
      }).then((response) => {
        if (response.status !== 200) {
          // Assuming server responds with
          // `{ "url": "http://example-cdn.com/image.jpg"}`
          return response.json().then(data => {
            if (true) {
              this.props.setEditorState(addNewBlock(
                this.props.getEditorState(),
                Block.IMAGE, {
                  src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490435646504&di=877c3b2134cda370cbf7f8c0708cd038&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F342ac65c103853438b3c5f8b9613b07ecb8088ad.jpg',
                }
              ));
            }  
          });
        } else {
          alert('上传失败,产生了:'+response.status+'错误！！');
        }
      });
    }
    this.props.close();
  }

}

// Now pass this component instead of default prop to Editor example above.
// 现在通过这个组件替代默认的Editor编辑器
class testEdit extends React.Component {
  constructor(props) {
    super(props);

    this.sideButtons = [{
      title: 'Image',
      component: CustomImageSideButton,
    }];

    this.state = {
      editorState: createEditorState(), // for empty content
    };

    /*
    this.state = {
      editorState: createEditorState(data), // with content
    };
    */

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  render() {
    const { editorState } = this.state;
    return (
    	<div style={{width:800,marginLeft:100}}>
      <Editor
        ref="editor"
        editorState={editorState}
        onChange={this.onChange}
        sideButtons={this.sideButtons}
      />
      </div>
    );
  }
};

export default testEdit;