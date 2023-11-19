const tap = require('tap');
const Whitelister = require('../');

tap.test('invalid options', (t) => {
  t.throws(() => { new Whitelister(); }, new TypeError('allowed must be an array or string'));
  t.throws(() => { new Whitelister(() => {}); }, new TypeError('allowed must be an array or string'));
  t.end();
});

tap.test('allows multiple domains', (t) => {
  const validator = new Whitelister([
    'example.com',
    'test.example.com'
  ]);
  t.equal(validator.verify('https://example.com/query'), true);
  t.equal(validator.verify('https://test.example.com/account'), true);
  t.equal(validator.verify('http://google.com/search'), false);
  t.end();
});

tap.test('allows single domain', (t) => {
  const validator = new Whitelister('example.com');
  t.equal(validator.verify('https://example.com/query'), true);
  t.equal(validator.verify('http://google.com/search'), false);
  t.end();
});

tap.test('allows wildcard domains', (t) => {
  const validator = new Whitelister([
    '*.example.com',
    'test.*.example2.com'
  ]);
  t.equal(validator.verify('https://example.com/query'), false);
  t.equal(validator.verify('https://metrics.example.com/query'), true);
  t.equal(validator.verify('https://test.example2.com/account'), false);
  t.equal(validator.verify('https://test.auth.example.com/account'), true);
  t.end();
});

tap.test('allows regex domains', (t) => {
  const validator = new Whitelister([
    '[a-n]+.com',
  ]);
  t.equal(validator.verify('https://example.com/query'), false);
  t.equal(validator.verify('https://acen.com/query'), true);
  t.equal(validator.verify('https://acenz.com/query'), false);
  t.end();
});

tap.test('Checks protocol', (t) => {
  const validator = new Whitelister('example.com');
  t.equal(validator.verify('https://example.com/query'), true);
  t.equal(validator.verify('gopher://example.com/query'), false);
  t.end();
});

tap.test('Override protocol', (t) => {
  const validator = new Whitelister('example.com');
  validator.allowedProtocols = ['gopher:'];

  t.equal(validator.verify('https://example.com/query'), false);
  t.equal(validator.verify('gopher://example.com/query'), true);
  t.end();
});
