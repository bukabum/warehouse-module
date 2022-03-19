import React, { Component, useEffect } from 'react';
import ContentLoader from "react-content-loader"
class TitleLoader extends Component {
render() {
        const TitleLoader = (props) => (
            <ContentLoader 
            speed={2}
            width={500}
            height={25}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
            >
            <rect  rx="10" ry="10" width="200" height="25" /> 
            </ContentLoader>
        )
    
    return (   
        <TitleLoader/>        
        )
    }
}
export default TitleLoader;