'use strict';

const test = require('ava'),
    path = require('path'),
    webpack = require('webpack'),
    q = require('q'),
    fs = require('fs'),
    
    packageJson = require('../package'),
    pathToSassjsLoader = path.join(__dirname, '..', packageJson.main),
    pathToEntrySass = path.join(__dirname, 'fixtures', 'index.scss');

test('Basic sass', function(t) {
    t.plan(1);
    console.log('plan');

    return q.nfcall(webpack, {
        entry: 'raw!' + pathToSassjsLoader + '!' + pathToEntrySass
    }).then(function(stats) {
        const expectedContents = fs.readFileSync(path.join(__dirname, 'expected', 'basic.css'), 'utf8');

        t.is(stats.toString(), expectedContents);
    }).catch(function(err) {
        t.fail(err);
    });
});
