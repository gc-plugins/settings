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
        case 'set':
            stream.write({
                key: 'set|loginItem',
                title: 'Launch Ground Control at login',
                description: undefined,
                icon: app.getLoginItemSettings().openAtLogin?
                    encodeURI('file://' + path.resolve(__dirname, 'img', 'checked.svg')):
                    encodeURI('file://' + path.resolve(__dirname, 'img', 'unchecked.svg'))
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
            case 'set|loginItem':
                if (app.getLoginItemSettings().openAtLogin) {
                    app.setLoginItemSettings({openAtLogin: false});
                }
                else {
                    app.setLoginItemSettings({openAtLogin: true});
                }
                break;
        }

        resolve();
    });
};

exports.keyword = [
    'quit',
    'exit',
    'set'
];
