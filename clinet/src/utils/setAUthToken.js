import React from 'react';
import axios from 'axios'


const setAUthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];

    }
}

export default setAUthToken