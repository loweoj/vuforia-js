# vuforia-js

Promise based client for the Vuforia Web Services API

## Features

- Implements all the target-based features of the Vuforia Web Service API
- 100% test coverage
- Fully typed

## Example

Add a target

```ts
import { Vuforia } from 'vuforia-js'

const vf = new Vuforia({
  serverAccessKey: 'your-access-key',
  serverSecretKey: 'your-secret-key';
})

vf.addTarget({
  name: 'targetName',
  width: 100,
  active_flag: false,
  image: 'base64-image-data',
  application_metadata: 'base64-string',
})
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
```

## Methods Available:

```ts
vf.addTarget({});

vf.deleteTarget('target-id');

vf.updateTarget('target-id', {});

vf.retrieveTarget('target-id');

vf.findDuplicates('target-id');

vf.targetSummary('target-id');

vf.databaseSummary();
```

## Helpers:

A few helpers functions are provided to convert data to base64:

```ts
// encode a local image file to base64 for use with addTarget and updateTarget
Vuforia.utils.encodeFileBase64('/path-to-local-file/relative-to/process.cwd');

// encode text as base64 for use with application_metadata - e.g. stringified json:
Vuforia.utils.encodeTextBase64(JSON.stringify({ json: 'metadata' }));
```
