# Test Framework Comparison

## Overview

This repository is a collection of different end-to-end testing methods in order to better understand their advantages and disadvantages. Using the [Robot Framework webdemo](https://bitbucket.org/robotframework/webdemo) as the common website to test, we can get a baseline between testing frameworks. 

# HOW TO CLONE THIS REPOSITORY

Each testing framework is a repository on their own, linked together here as [git submodules](https://git-scm.com/docs/git-submodule). A normal `git clone` will not work because of this, so instead you have to tell git to clone recursively:
```
git clone --recurse-submodules <repo>
```

The same is true for pulling further changes:
```
git pull --recurse-submodules
```

After initial cloning, when switching to the branch directory, the head will default to a hash branch.

Checkout master and do not work with the has branch. This is a one-time requirement working with submodules 

```
/c/test-framework-comparison (master)
cd cypress-demo/

/c/test-framework-comparison/cypress-demo ((cb0dcf3...))  -> this is the hash branch
git checkout master

Switched to branch 'master'
Your branch is up to date with 'origin/master'.

/c/test-framework-comparison/cypress-demo (master)
```


### Protractor vs Robot Framework

#### Robot Setup

First, [install python](https://www.python.org/) if you haven't already. Make sure you check the box 'Add Python to environment variables' during the installation process if you are on Windows.

Pip comes prepackaged with Python nowadays, so installing Selenium and Robot is simple:

```
    pip install robotframework
    pip install robotframework-seleniumlibrary
```

Finally, download and extract [chromedriver](https://sites.google.com/a/chromium.org/chromedriver/downloads). Add the extracted location to your PATH environment variable.

>To add an environment variable in Windows, invoke *Control Panel\All Control Panel Items\System\Advanced system settings*, once *System Properties* loads, nav to *Advanced* tab and *Environment Variables...*.
>Under *System variables* find *Path*, *Edit...* and add the chromedriver folder path in the *Edit environment variable* dialog. 

#### Running Robot Tests

Start up the server in a separate terminal window, the script assumes you are in root directory:
```
python webdemo/demoapp/server.py
```

Ensure the server is running by visiting http://localhost:7272. 

If you receive SSL errors, either test the server in incognito or add IIS features to Windows.
> To enable IIS Features in Windows, go to Control panel path: *Control Panel\All Control Panel Items\Programs and Features*, invoke *Turn Windows features on or off*, at the top level enable *Internet Information Services* and *Internet Information Services Hostable Web Core*

Now we can run the tests. Navigate to webdemo folder and run: 

```
robot login_tests
```

Test results can be viewed in report.html.

----
#### Protractor Setup

First, make sure [node](https://nodejs.org/en/) is installed.

Then install dependencies.

```
cd protractor-demo
npm install
```

Update webdriver manager
```
npm run update-webdriver
```

#### Running Protractor Tests

Start up the server again like we did before, the script assumes you are in root directory:
```
python webdemo/demoapp/server.py
```

Navigate to protractor-demo directory and run the tests
```
npm run e2e
```

------

#### Cypress Setup

From the root of the repository, nav to cypress-demo directory and npm install. Cypress and TypeScript settings are already in package.json.

```
npm i
```

Start up the server again like we did before, the script assumes you are in root directory:
```
python webdemo/demoapp/server.py
```

To execute tests by choice, open Cypress. This launches the tests to execute a-la-carte.

```
npm run cypress:open
```
Under *webdemo*, select *home_page.spec.ts* .
> Cypress monitors your spec files for any changes and automatically displays any changes in the app.
