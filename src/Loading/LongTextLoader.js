import React, { Component, useEffect } from 'react';
import ContentLoader from "react-content-loader"
class LongTextLoader extends Component {
render() {
    const LongTextLoader = (props) => (
        <ContentLoader 
          speed={2}
          width={950}
          height={15}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
        >
          <rect  rx="10" ry="10" width="950" height="15" /> 
        </ContentLoader>
      )
    
    return (   
        <LongTextLoader/>        
        )
    }
}
export default LongTextLoader;