import test from 'ava';
import MockDate from 'mockdate';
import nock from 'nock';

import { Vuforia, VuforiaError } from './vuforia';

MockDate.set(new Date('2019-01-01T00:00:00.000Z'));

test('addTarget', async (t) => {
  const scope = nock('https://vws.vuforia.com', {
    reqheaders: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'content-length': '113',
      authorization: 'VWS access-key:5nAjAFgnOBUzaKWew9jbSLBVPP4=',
      date: 'Tue, 01 Jan 2019 00:00:00 GMT',
    },
  })
    .post(
      '/targets',
      '{"name":"targetName","width":1,"image":"image","active_flag":false,"application_metadata":"some-base64-metadata"}'
    )
    .reply(201);

  const vf = new Vuforia({
    serverAccessKey: 'access-key',
    serverSecretKey: 'secret-key',
  });

  await vf.addTarget({
    name: 'targetName',
    width: 1,
    image: 'image',
    active_flag: false,
    application_metadata: 'some-base64-metadata',
  });

  t.true(scope.isDone());
});

test('deleteTarget', async (t) => {
  const scope = nock('https://vws.vuforia.com', {
    reqheaders: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'content-length': '0',
      authorization: 'VWS access-key:S9l11l3Tt9jkThDTjC2oXGH4sww=',
      date: 'Tue, 01 Jan 2019 00:00:00 GMT',
    },
  })
    .delete('/targets/some-target-id', '')
    .reply(200);

  const vf = new Vuforia({
    serverAccessKey: 'access-key',
    serverSecretKey: 'secret-key',
  });

  await vf.deleteTarget('some-target-id');

  t.true(scope.isDone());
});

test('updateTarget', async (t) => {
  const scope = nock('https://vws.vuforia.com', {
    reqheaders: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'content-length': '115',
      authorization: 'VWS access-key:+Lw62e6ZIkTRtCIDm1aT4OOkTyc=',
      date: 'Tue, 01 Jan 2019 00:00:00 GMT',
    },
  })
    .put(
      '/targets/some-target-id',
      '{"name":"updated-name","width":1,"image":"image","active_flag":false,"application_metadata":"some-base64-metadata"}'
    )
    .reply(200);

  const vf = new Vuforia({
    serverAccessKey: 'access-key',
    serverSecretKey: 'secret-key',
  });

  await vf.updateTarget('some-target-id', {
    name: 'updated-name',
    width: 1,
    image: 'image',
    active_flag: false,
    application_metadata: 'some-base64-metadata',
  });

  t.true(scope.isDone());
});

test('retrieveTarget', async (t) => {
  const scope = nock('https://vws.vuforia.com', {
    reqheaders: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'content-length': '0',
      authorization: 'VWS access-key:2HXsQpKKbZ71WyYS2LOoZ9JMrpY=',
      date: 'Tue, 01 Jan 2019 00:00:00 GMT',
    },
  })
    .get('/targets/some-target-id')
    .reply(200);

  const vf = new Vuforia({
    serverAccessKey: 'access-key',
    serverSecretKey: 'secret-key',
  });

  await vf.retrieveTarget('some-target-id');

  t.true(scope.isDone());
});

test('duplicateTargets', async (t) => {
  const scope = nock('https://vws.vuforia.com', {
    reqheaders: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'content-length': '0',
      authorization: 'VWS access-key:SHrsFYyP6/QmVaGSoL+ELfp8HZ4=',
      date: 'Tue, 01 Jan 2019 00:00:00 GMT',
    },
  })
    .get('/duplicates/some-target-id')
    .reply(200);

  const vf = new Vuforia({
    serverAccessKey: 'access-key',
    serverSecretKey: 'secret-key',
  });

  await vf.findDuplicates('some-target-id');

  t.true(scope.isDone());
});

test('targetSummary', async (t) => {
  const scope = nock('https://vws.vuforia.com', {
    reqheaders: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'content-length': '0',
      authorization: 'VWS access-key:UJbTZCXe7XsJ41fjIswpHNUNfu8=',
      date: 'Tue, 01 Jan 2019 00:00:00 GMT',
    },
  })
    .get('/summary/some-target-id')
    .reply(200);

  const vf = new Vuforia({
    serverAccessKey: 'access-key',
    serverSecretKey: 'secret-key',
  });

  await vf.targetSummary('some-target-id');

  t.true(scope.isDone());
});

test('databaseSummary', async (t) => {
  const scope = nock('https://vws.vuforia.com', {
    reqheaders: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'content-length': '0',
      authorization: 'VWS access-key:Jqw923dMILPsTCuSidnBl52cjv4=',
      date: 'Tue, 01 Jan 2019 00:00:00 GMT',
    },
  })
    .get('/summary')
    .reply(200);

  const vf = new Vuforia({
    serverAccessKey: 'access-key',
    serverSecretKey: 'secret-key',
  });

  await vf.databaseSummary();

  t.true(scope.isDone());
});

test('error handling: vuforia api', async (t) => {
  const scope = nock('https://vws.vuforia.com', {
    reqheaders: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'content-length': '0',
      authorization: 'VWS access-key:2HXsQpKKbZ71WyYS2LOoZ9JMrpY=',
      date: 'Tue, 01 Jan 2019 00:00:00 GMT',
    },
  })
    .get('/targets/some-target-id')
    .reply(404, {
      result_code: 'UnknownTarget',
    });

  const vf = new Vuforia({
    serverAccessKey: 'access-key',
    serverSecretKey: 'secret-key',
  });

  const error = await t.throwsAsync(() => vf.retrieveTarget('some-target-id'));
  t.true(error instanceof VuforiaError);
  t.is((error as VuforiaError).resultCode, 'UnknownTarget');
  t.is((error as VuforiaError).statusCode, 404);
  t.true(scope.isDone());
});

test('error handling: generic error', async (t) => {
  const scope = nock('https://vws.vuforia.com', {
    reqheaders: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'content-length': '0',
      authorization: 'VWS access-key:2HXsQpKKbZ71WyYS2LOoZ9JMrpY=',
      date: 'Tue, 01 Jan 2019 00:00:00 GMT',
    },
  })
    .get('/targets/some-target-id')
    .reply(500, {
      generic_error: 'Some unknown thing happened somewhere',
    });

  const vf = new Vuforia({
    serverAccessKey: 'access-key',
    serverSecretKey: 'secret-key',
  });

  const error = await t.throwsAsync(() => vf.retrieveTarget('some-target-id'));

  t.true(scope.isDone());
  t.true(error instanceof Error);
  t.is(error?.message, 'Request failed with status code 500');
});

test('utils: base64File', async (t) => {
  t.is(
    await Vuforia.utils.encodeFileBase64('./fixtures/test-image.jpg'),
    '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'
  );
});

test('utils: base64Text', async (t) => {
  t.is(
    await Vuforia.utils.encodeTextBase64(JSON.stringify({ fee: 'bar' })),
    'eyJmZWUiOiJiYXIifQ=='
  );
});
