/* jshint node: true, esversion: 6 */
'use strict';

let {app} = require('electron'),
    path = require('path');

exports.init = ({config}) => {

};

exports.process = ({keyword, term, stream}) => {
    switch (keyword) {
        case 'quit':
        case 'exit':
            stream.write({
                key: 'quit',
                title: 'Quit Ground Control',
                description: undefined,
                icon: encodeURI('file://' + path.resolve(__dirname, 'img', 'quit.svg'))
            });
            stream.end();
            break;
    }
};

exports.execute = ({key}) => {
    return new Promise((resolve, reject) => {
        switch (key) {
            case 'quit':
            case 'exit':
                app.quit();
                break;
        }

        resolve();
    });
};

exports.keyword = [
    'quit',
    'exit'
];
