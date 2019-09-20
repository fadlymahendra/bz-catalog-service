
# Add Function to Your Lambda #

[back](../README.md)

Your lambdas are located under **modules** folder, except folder has suffix -models, that is your service data models package.

## Step 1: Create Logic Layer File (libs) ##

* [1] Go to your **lambda root** folder (modules/bizzy-[servicename])
* [2] Finish **environments/TODO.txt**
    * Create **local.env** using **stage_name.env.example**, change **IDENTIFIER** value to **Local**
    * Create **development.env** using **stage_name.env.example**, change **IDENTIFIER** value to **Development**
* [3] Create new Object definition (class):
    * Create new NodeJS file in **libs** folder
    * Create new class using module.exports javascript pattern
    * Create new publicly accessible promise method in this class using this signature **functionName(data, context)**, example
```javascript
//myclass.js
'use strict';

const Promise = require('bluebird');

function MyClass() {}

MyClass.prototype.myFunction = Promise.coroutine(function*(data, context) {
    data.message = "This is my first function";
    data.env = process.env.IDENTIFIER;
    return data;
});

module.exports = MyClass;
```

* [4] Register your method to lambda infastructure code
    * Open **index.js** located in the root folder
    * Register your public method by adding this line inside **region ACTIONS**:
```javascript
//region ACTIONS

const MyClass = require('./libs/myclass');
const myClassObj = new MyClass();

Handler.registerMethod('callMyFunction', myCLassObj.myFunction);

//endregion
```

or you can do it this way

```javascript
//region ACTIONS

const myClassObj = new (require('./libs/myclass'));

Handler.registerMethod('callMyFunction', myClassObj.myFunction);

//endregion
```

* [5] Test your lambda NodeJS code
    * Open terminal, set current working directory to your lambda folder
    * Run test command: **npm test callMyFunction '{"myId": "BundarIDSaya"}'**
    * If your input data is complex or too long to be sent as command arguments, you may want to:
        * Create **[actionName].json** file inside **tests/mocks** folder, make sure your **.json** file match your action name, for example:

            {
                "myId": "IDSayaBundar"
            }

        * Run test command this way: **npm test callMyFunction**
    * The output of your test command should be your function output
* [6] Deploy your lambda using: **npm run deploy-dev**

## Step 2: Define API Route ##

* [1] Go to **svc/api** folder
* [2] Add new folder inside **paths** folder, for example: **demo**
* [3] Add new yml file inside your **demo** folder, for example: **hello_by_id.yml**
* [4] Your api folder structure should look like this:

```
api
    definitions/
    extensions/
    paths/
        demo/
            hello_by_id.yml
        utils/
        examples/
        index.yml
        responses.yml
```

* [5] Copy content from one of the file in examples folder, in this Step tutorial, you might want to copy **sample-get.yml** content to your **hello_by_id.yml** file
* [6] Edit **index.yml** in **paths** folder, add your **hello_by_id.yml** file to API routes definitions, **index.yml** will look like this:
```yml
# api/paths/index.yml

/hello/{id}:
    $ref: ./demo/hello_by_id.yml
/ping:
    $ref: ./utils/ping.yml
```
* [7] Edit **demo/hello_by_id.yml**
    * Please pay attention to **parameters** field, name attribute, the value **MUST** match your **path or routes** defined in step 6 (/hello/**{id}**)
    * Edit **line 24**, the one that starts with: **arn:aws:apigateway:ap-southeast-1:lambda.....**. Change [lambda-name] with your lambda-name ( **bizzy-[servicename]** )
    * Edit **line 18 - 20** appropriately, for example:

```json
{
    "action": "callMyFunction",
    "data": {
    "myId": "$input.params('id')"
    }
}
```

* [8] Deploy your API Gateway using: **npm run deploy**

## Step 3: Test Deployed API ##
1. Find **api.id** file inside **svc** folder
2. This file should contains your api endpoint address
3. Find dev endpoint and add /hello/ThisisMyid to the end of the endpoint, execute that url endpoint in your test tools (POSTMANT / browser)