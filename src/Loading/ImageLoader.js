import React, { Component, useEffect } from 'react';
import ContentLoader from "react-content-loader"
class ImageLoader extends Component {
render() {
    const ImageLoader = (props) => (
        <ContentLoader 
            speed={2}
            width={250}
            height={150}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
            >
            <rect width="250" height="150" /> 
        </ContentLoader>
    )
    
    return (   
        <ImageLoader/>        
        )
    }
}
export default ImageLoader;