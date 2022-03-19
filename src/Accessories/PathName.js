import {matchPath, useLocation} from "react-router-dom";

const routes = [ ':state/:city' ];

export default function PathName() {
    const { pathname } = useLocation();

    //return matchPath( pathname, routes )?.path;
    return console.log('lol')
}