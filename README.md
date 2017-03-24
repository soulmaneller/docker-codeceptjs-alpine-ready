# Info

This image include WebDriverIO for codeceptjs. Also installed `mochawesome` reporter plugin

## Mounting

- All test files `/codeceptjs/tests`
- Screenshot output `/codeceptjs/output`
- Reporter `/codeceptjs/reporter_output`

## Custom configuration

If you want to use your custom configuration mount your `path/to/config` to `/codeceptjs/extras`

```
-v path/to/config:/codeceptjs/extras
```

### Codeceptjs configuration

filename: `codecept.conf.js`

**Sample**
``` javascript
exports = {
    "tests": "./tests/*_test.js",       // Tests directory
    "timeout": 10000,                   // Test timeout
    "output": "./output",               // Screenshot output
    "helpers": {
        "WebDriverIO": {
            "host": "localhost",        // Selenium url,
            "url": "http://google.com/",// Target url
            "browser": "chrome",        // Testing browser
            "windowSize": "1920x1080"   // Window size [ default: 1920x1080 ]
        }
    },
}
```

### Steps_file

filename: `steps_file.js`

**Sample**
``` javascript
'use strict';
// in this file you can append custom step methods to 'I' object
module.exports = function() {
    /* jshint -W117 */
    return actor({

    });
};
```

# Sample use case

This sample will using supervisor for re-run test by automatic when test file has changed

## Using with `selenium/standalone-chrome`

### Prepare docker images

- docker pull soulmaneller/codeceptjs-alpine-ready
- docker pull selenium/standalone-chrome

### Initial codeceptjs-test

- Create `docker-compose.yml` on root path
    ``` yml
    version: '2'
    services:
        codeceptjs:
            image: soulmaneller/codeceptjs-alpine-ready
            command: supervisor -w tests -x codeceptjs -n exit -- run --reporter mochawesome
            links:
                - chrome:selenium   # Set hostname of selenium this must match WebDriverIO hostname
            volumes:
                - ./path/to/test/files:/codeceptjs/tests
                - ./output:/codeceptjs/output
                - ./reporter_output:/codeceptjs/reporter_output
                
        chrome:
            image: selenium/standalone-chrome
    ```

- Start testing `docker-compose up` from root path
