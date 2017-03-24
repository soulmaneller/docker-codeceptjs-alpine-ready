const fs = require( 'fs-extra' ),
    path = require( 'path' ),
    _    = require( 'lodash' );

const _defaultConf = {
        "tests": "./tests/*_test.js",
        "timeout": 10000,
        "output": "./output",
        "helpers": {
            "WebDriverIO": {
                "host": "localhost", // "selenium",
                "url": "", // "http://192.168.0.109/prolevel/",
                "browser": "chrome",
                "windowSize": "1920x1080"
            }
        },
        "include": {
            "I": "./steps_file.js"
        },
        "bootstrap": false,
        "mocha": {
            "reporterOptions": {
                "reportDir": "reporter_output",
                "reportFilename": "report"
            }
        },
        "name": "codecept"
    },
    custom_conf_path = path.join( process.cwd(), 'extras', 'codecept.conf.js' );

let conf,
    loaded_conf;

if( fs.existsSync( custom_conf_path )) {
    try {
        loaded_conf = require( custom_conf_path );
    } catch (e) {
        console.log( 'error :', e );
        loaded_conf = {};
    }
}

conf = _.merge( _defaultConf, loaded_conf );

exports.config = conf;
