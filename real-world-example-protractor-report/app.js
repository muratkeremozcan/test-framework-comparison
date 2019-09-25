var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "should login|Login - Logout",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "instanceId": 41,
        "browser": {
            "name": "chrome",
            "version": "60.0.3112.113"
        },
        "message": [
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.",
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.",
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL."
        ],
        "trace": [
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4281:23)\n    at ontimeout (timers.js:436:11)\n    at tryOnTimeout (timers.js:300:5)\n    at listOnTimeout (timers.js:263:5)\n    at Timer.processTimers (timers.js:223:10)",
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4281:23)\n    at ontimeout (timers.js:436:11)\n    at tryOnTimeout (timers.js:300:5)\n    at listOnTimeout (timers.js:263:5)\n    at Timer.processTimers (timers.js:223:10)",
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4281:23)\n    at ontimeout (timers.js:436:11)\n    at tryOnTimeout (timers.js:300:5)\n    at listOnTimeout (timers.js:263:5)\n    at Timer.processTimers (timers.js:223:10)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://app-boic-v.horizondev.cloud/vendor.js 248746:12 \"BsDatepickerModule is under development,\\n      BREAKING CHANGES are possible,\\n      PLEASE, read changelog\"",
                "timestamp": 1545256211648,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.login.siemens.com/SiemensSansRegular_West.woff - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1545256220655,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.login.siemens.com/js/lock/11.11.0/lock.min.js - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1545256220656,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://login-qa.siemens.com/login?state=g6Fo2SBBa3NMdEh6dXN2dkpnZTF6Qks0cWJTNUk4UXBJTGtpVqN0aWTZMmdhRm8yU0JxVFZObWJrWm1jRTB6ZHpoSVpYRnpXbHBMZWpKMlRVaEhhVGRHZDA1S2F3o2NpZNkgM0lTTzBNb1NGTkRhd3pTRWtGTWxZZVFvYUFtdzM2cFI&client=3ISO0MoSFNDawzSEkFMlYeQoaAmw36pR&protocol=oauth2&audience%3Aurn%3Aauth0%3Asiemens-qa%3Asiemens-qa-bt-015=&login_options=sup&response_type=code&redirect_uri=https%3A%2F%2Fsiemens-qa-bt-015.eu.auth0.com%2Flogin%2Fcallback&scope=openid%20profile%20email 239:35 Uncaught ReferenceError: Auth0Lock is not defined",
                "timestamp": 1545256220658,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.login.siemens.com/siemens-logo-en-2x.png - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1545256220658,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.login.siemens.com/siemens-logo-claim-en-2x.png - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1545256220658,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.login.siemens.com/favicon.ico - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1545256220689,
                "type": ""
            }
        ],
        "screenShotFile": "00cc00c2-0069-00d6-003c-0019006900c2.png",
        "timestamp": 1545256197532,
        "duration": 540022
    },
    {
        "description": "should fill out the site form and save a site|Add Site|Add and Edit Site",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 41,
        "browser": {
            "name": "chrome",
            "version": "60.0.3112.113"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e5009c-0054-005c-00d8-00540066009d.png",
        "timestamp": 1545256737884,
        "duration": 1
    },
    {
        "description": "should add multiple sites|Add Site|Add and Edit Site",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 41,
        "browser": {
            "name": "chrome",
            "version": "60.0.3112.113"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005e007b-00a6-0074-0070-00390067005f.png",
        "timestamp": 1545256737895,
        "duration": 0
    },
    {
        "description": "should navigate to edit site page|Edit Site|Add and Edit Site",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "instanceId": 41,
        "browser": {
            "name": "chrome",
            "version": "60.0.3112.113"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, .collapse.navbar-collapse)",
            "Failed: Cannot read property 'navToElement' of undefined"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, .collapse.navbar-collapse)\n    at elementArrayFinder.getWebElements.then (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/protractor/built/element.js:831:22)\n    at HomePage.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/panel-objects/HomePage/home-page.ts:50:32)\n    at step (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/panel-objects/HomePage/home-page.ts:42:23)\n    at Object.next (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/panel-objects/HomePage/home-page.ts:23:53)\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/panel-objects/HomePage/home-page.ts:17:71\n    at new Promise (<anonymous>)\n    at __awaiter (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/panel-objects/HomePage/home-page.ts:13:12)\n    at HomePage.goHome (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/panel-objects/HomePage/home-page.ts:105:16)\nFrom: Task: Run beforeAll in control flow\n    at UserContext.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at QueueRunner.execute (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4199:10)\n    at queueRunnerFactory (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:909:35)\n    at UserContext.fn (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:5325:13)\n    at attempt (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:10:3)\n    at addSpecsToSuite (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:8:1)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Module.m._compile (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/ts-node/src/index.ts:392:23)\n    at Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Object.require.extensions.(anonymous function) [as .ts] (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/ts-node/src/index.ts:395:12)",
            "TypeError: Cannot read property 'navToElement' of undefined\n    at Object.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:28:56)\n    at step (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:32:23)\n    at Object.next (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:13:53)\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:3:12)\n    at UserContext.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:27:45)\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:2505:12)\nFrom: Task: Run it(\"should navigate to edit site page\") in control flow\n    at UserContext.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:27:5)\n    at addSpecsToSuite (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Suite.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:26:3)\n    at addSpecsToSuite (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:8:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "004600fa-00df-0012-00fc-00e0007a00c1.png",
        "timestamp": 1545256737904,
        "duration": 6
    },
    {
        "description": "should fill out the site form and save a site|Add Site|Add and Edit Site",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 52,
        "browser": {
            "name": "chrome",
            "version": "60.0.3112.113"
        },
        "message": "Pending",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://app-boic-v.horizondev.cloud/vendor.js 248746:12 \"BsDatepickerModule is under development,\\n      BREAKING CHANGES are possible,\\n      PLEASE, read changelog\"",
                "timestamp": 1545256752394,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.login.siemens.com/SiemensSansRegular_West.woff - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1545256761141,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.login.siemens.com/js/lock/11.11.0/lock.min.js - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1545256761141,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://login-qa.siemens.com/login?state=g6Fo2SBIRWhkb1huc3Vjc094QnJucUpETm1jUnR5dWJyRU4zMaN0aWTZMmdhRm8yU0J0VGxkaE5rMXhiSEJGUjFwUmRUZFRNWFUwYzNadVIxQnFkakJHUmxOT1NRo2NpZNkgM0lTTzBNb1NGTkRhd3pTRWtGTWxZZVFvYUFtdzM2cFI&client=3ISO0MoSFNDawzSEkFMlYeQoaAmw36pR&protocol=oauth2&audience%3Aurn%3Aauth0%3Asiemens-qa%3Asiemens-qa-bt-015=&login_options=sup&response_type=code&redirect_uri=https%3A%2F%2Fsiemens-qa-bt-015.eu.auth0.com%2Flogin%2Fcallback&scope=openid%20profile%20email 239:35 Uncaught ReferenceError: Auth0Lock is not defined",
                "timestamp": 1545256761142,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.login.siemens.com/siemens-logo-en-2x.png - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1545256761145,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.login.siemens.com/siemens-logo-claim-en-2x.png - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1545256761146,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.login.siemens.com/favicon.ico - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1545256761174,
                "type": ""
            }
        ],
        "screenShotFile": "0088008e-00c2-0044-00d6-002b003500a0.png",
        "timestamp": 1545256920969,
        "duration": 3
    },
    {
        "description": "should add multiple sites|Add Site|Add and Edit Site",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 52,
        "browser": {
            "name": "chrome",
            "version": "60.0.3112.113"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e000e7-0026-004c-0002-0012007f00ab.png",
        "timestamp": 1545256921014,
        "duration": 0
    },
    {
        "description": "should navigate to edit site page|Edit Site|Add and Edit Site",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "instanceId": 52,
        "browser": {
            "name": "chrome",
            "version": "60.0.3112.113"
        },
        "message": [
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.",
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.",
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.",
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL."
        ],
        "trace": [
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4281:23)\n    at ontimeout (timers.js:436:11)\n    at tryOnTimeout (timers.js:300:5)\n    at listOnTimeout (timers.js:263:5)\n    at Timer.processTimers (timers.js:223:10)",
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4281:23)\n    at ontimeout (timers.js:436:11)\n    at tryOnTimeout (timers.js:300:5)\n    at listOnTimeout (timers.js:263:5)\n    at Timer.processTimers (timers.js:223:10)",
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4281:23)\n    at ontimeout (timers.js:436:11)\n    at tryOnTimeout (timers.js:300:5)\n    at listOnTimeout (timers.js:263:5)\n    at Timer.processTimers (timers.js:223:10)",
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4281:23)\n    at ontimeout (timers.js:436:11)\n    at tryOnTimeout (timers.js:300:5)\n    at listOnTimeout (timers.js:263:5)\n    at Timer.processTimers (timers.js:223:10)"
        ],
        "browserLogs": [],
        "screenShotFile": "00de00c0-0013-0093-00e2-00a200870055.png",
        "timestamp": 1545256921059,
        "duration": 539943
    },
    {
        "description": "should login|Login - Logout",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "instanceId": 63,
        "browser": {
            "name": "chrome",
            "version": "60.0.3112.113"
        },
        "message": [
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.",
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.",
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL."
        ],
        "trace": [
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4281:23)\n    at ontimeout (timers.js:436:11)\n    at tryOnTimeout (timers.js:300:5)\n    at listOnTimeout (timers.js:263:5)\n    at Timer.processTimers (timers.js:223:10)",
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4281:23)\n    at ontimeout (timers.js:436:11)\n    at tryOnTimeout (timers.js:300:5)\n    at listOnTimeout (timers.js:263:5)\n    at Timer.processTimers (timers.js:223:10)",
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4281:23)\n    at ontimeout (timers.js:436:11)\n    at tryOnTimeout (timers.js:300:5)\n    at listOnTimeout (timers.js:263:5)\n    at Timer.processTimers (timers.js:223:10)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://app-boic-v.horizondev.cloud/vendor.js 248746:12 \"BsDatepickerModule is under development,\\n      BREAKING CHANGES are possible,\\n      PLEASE, read changelog\"",
                "timestamp": 1545257472247,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.login.siemens.com/SiemensSansRegular_West.woff - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1545257480605,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.login.siemens.com/js/lock/11.11.0/lock.min.js - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1545257480606,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://login-qa.siemens.com/login?state=g6Fo2SAwa010RUduY0puam03MnNRV0NERHV2RkJrVzd4dTQtY6N0aWTZMmdhRm8yU0JLTTJWelNGQkJWVUozZUZKSk0yRnJlVmQ0TVVweldYSnhMVGhrUm05VWNno2NpZNkgM0lTTzBNb1NGTkRhd3pTRWtGTWxZZVFvYUFtdzM2cFI&client=3ISO0MoSFNDawzSEkFMlYeQoaAmw36pR&protocol=oauth2&audience%3Aurn%3Aauth0%3Asiemens-qa%3Asiemens-qa-bt-015=&login_options=sup&response_type=code&redirect_uri=https%3A%2F%2Fsiemens-qa-bt-015.eu.auth0.com%2Flogin%2Fcallback&scope=openid%20profile%20email 239:35 Uncaught ReferenceError: Auth0Lock is not defined",
                "timestamp": 1545257480606,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.login.siemens.com/siemens-logo-en-2x.png - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1545257480607,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.login.siemens.com/siemens-logo-claim-en-2x.png - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1545257480607,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://cdn.login.siemens.com/favicon.ico - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1545257480627,
                "type": ""
            }
        ],
        "screenShotFile": "00920076-001f-008c-00d0-00c400f7002c.png",
        "timestamp": 1545257464083,
        "duration": 540036
    },
    {
        "description": "should fill out the site form and save a site|Add Site|Add and Edit Site",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 63,
        "browser": {
            "name": "chrome",
            "version": "60.0.3112.113"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b100a8-000f-008f-00e9-009d008e00b2.png",
        "timestamp": 1545258004437,
        "duration": 0
    },
    {
        "description": "should add multiple sites|Add Site|Add and Edit Site",
        "passed": false,
        "pending": true,
        "os": "Linux",
        "instanceId": 63,
        "browser": {
            "name": "chrome",
            "version": "60.0.3112.113"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00560080-00f3-0005-0026-0056008400bd.png",
        "timestamp": 1545258004450,
        "duration": 0
    },
    {
        "description": "should navigate to edit site page|Edit Site|Add and Edit Site",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "instanceId": 63,
        "browser": {
            "name": "chrome",
            "version": "60.0.3112.113"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, .collapse.navbar-collapse)",
            "Failed: Cannot read property 'navToElement' of undefined"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, .collapse.navbar-collapse)\n    at elementArrayFinder.getWebElements.then (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/protractor/built/element.js:831:22)\n    at HomePage.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/panel-objects/HomePage/home-page.ts:50:32)\n    at step (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/panel-objects/HomePage/home-page.ts:42:23)\n    at Object.next (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/panel-objects/HomePage/home-page.ts:23:53)\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/panel-objects/HomePage/home-page.ts:17:71\n    at new Promise (<anonymous>)\n    at __awaiter (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/panel-objects/HomePage/home-page.ts:13:12)\n    at HomePage.goHome (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/panel-objects/HomePage/home-page.ts:105:16)\nFrom: Task: Run beforeAll in control flow\n    at UserContext.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at QueueRunner.execute (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4199:10)\n    at queueRunnerFactory (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:909:35)\n    at UserContext.fn (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:5325:13)\n    at attempt (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:10:3)\n    at addSpecsToSuite (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:8:1)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Module.m._compile (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/ts-node/src/index.ts:392:23)\n    at Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Object.require.extensions.(anonymous function) [as .ts] (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/ts-node/src/index.ts:395:12)",
            "TypeError: Cannot read property 'navToElement' of undefined\n    at Object.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:28:56)\n    at step (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:32:23)\n    at Object.next (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:13:53)\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:3:12)\n    at UserContext.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:27:45)\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:2505:12)\nFrom: Task: Run it(\"should navigate to edit site page\") in control flow\n    at UserContext.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:27:5)\n    at addSpecsToSuite (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Suite.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:26:3)\n    at addSpecsToSuite (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/builds/horizon/facility-manager-ba/ui-building-operator-ic/node_modules/jasmine/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/builds/horizon/facility-manager-ba/ui-building-operator-ic/e2e/test-cases/add-site-ui.e2e-spec.ts:8:1)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c400b3-00ff-00e2-00a3-00df000f00c4.png",
        "timestamp": 1545258004460,
        "duration": 13
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
