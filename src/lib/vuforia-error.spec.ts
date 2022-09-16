import test from 'ava';

import { VuforiaError } from './vuforia-error';

test('it should set the correct instance properties', (t) => {
  const error = new VuforiaError('TargetNameExist', 422, {
    result_code: 'TargetNameExist',
  });

  t.true(error instanceof Error);
  t.true(error instanceof VuforiaError);
  t.is(error.name, 'VuforiaError');
  t.is(error.resultCode, 'TargetNameExist');
  t.is(error.statusCode, 422);
  t.deepEqual(error.getRawResponse(), {
    result_code: 'TargetNameExist',
  });
  t.is(
    error.message,
    'TargetNameExist - The corresponding target name already exists.'
  );
});

test('it should set correct Fail 422 message', (t) => {
  const error = new VuforiaError('Fail', 422);
  t.is(
    error.message,
    'Fail - The request was invalid and could not be processed. Check the request headers and fields.'
  );
});

test('it should set correct Fail 500 message', (t) => {
  const error = new VuforiaError('Fail', 500);
  t.is(
    error.message,
    'Fail - The server encountered an internal error, please retry the request.'
  );
});

test('it should default Fail code to 500 for non-existent status code', (t) => {
  const error = new VuforiaError('Fail', 123);
  t.is(
    error.message,
    'Fail - The server encountered an internal error, please retry the request.'
  );
});
