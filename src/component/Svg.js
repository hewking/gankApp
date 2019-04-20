import React, { Component } from 'react';
import SvgUri from 'react-native-svg-uri/index';
// import SvgUri from 'react-native-svg-uri';
import svgs from '../res/assets/svgs';

export default class Svg extends Component {
  render() {
    let {
      icon,
      color,
      size,
      style,
      source,
    } = this.props;
    icon = 'fendi'
    let svgXmlData = svgs[icon];

    if (!svgXmlData) {
      let err_msg = `没有"${this.props.icon}"这个icon`;
      throw new Error(err_msg);
    }
    return (
      <SvgUri
        width={size}
        height={size}
        svgXmlData={svgXmlData}
        fill={color}
        style={style}
        source={source}
      />
    )
  }
}