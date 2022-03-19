import React, { Component, useEffect } from 'react';
import ContentLoader from "react-content-loader"
class ShortTextLoader extends Component {
render() {
    const ShortTextLoader = (props) => (
        <ContentLoader 
          speed={2}
          width={210}
          height={15}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
        >
          <rect  rx="10" ry="10" width="210" height="15" /> 
        </ContentLoader>
      )
    
    return (   
        <ShortTextLoader/>        
        )
    }
}
export default ShortTextLoader;