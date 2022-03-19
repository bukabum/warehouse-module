import React, { Component, useEffect } from 'react';
import ContentLoader from "react-content-loader"
class BigImageLoader extends Component {
render() {
    const BigImageLoader = (props) => (
        <ContentLoader 
            speed={2}
            width={800}
            height={400}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
            >
            <rect width="800" height="400" /> 
        </ContentLoader>
    )
    
    return (   
        <BigImageLoader/>        
        )
    }
}
export default BigImageLoader;