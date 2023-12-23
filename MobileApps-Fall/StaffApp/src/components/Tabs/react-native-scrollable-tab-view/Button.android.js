import React from 'react';
import {TouchableOpacity} from "react-native";


const Button = (props) => {
    return <TouchableOpacity activeOpacity={0.85}{...props}>
        {props.children}
    </TouchableOpacity>;
};

module.exports = Button;
