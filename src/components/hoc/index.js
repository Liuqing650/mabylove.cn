import React from 'react';

/**
 * 修改返回路径的高阶函数
 * @param {function} hocProps
 */
function hoc({hocProps}) {
  return (WrappedComponent) => {
    class DynamicPath extends React.Component {
      componentDidMount() {
        const { path, query, parentPath } = hocProps(this.props);
        const { location, dispatch } = this.props;
        dispatch({
          type: 'client/changePath',
          payload: {
            back: path,
            backQuery: query,
            parentPath: parentPath || false,
            pathname: location.pathname
          }
        });
      }
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    return DynamicPath;
  };
}
export default hoc;
