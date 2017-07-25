'use strict';
require('mocha');
require('co-mocha');

const describedModuleName = 'two-phase-commit-es5.test.js';
const path = require('path');
const describedModule = require(path.join(__dirname, describedModuleName));
describe(describedModule, function () {
  context('#after', function () {
    beforeEach(function () {
      this._module = new describedModel();
    })
    it ('should execute without error', function (){
      console.log('pending');
    });
  });
});
