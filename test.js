"use strict";
var assert = require("assert"),
		add = require("./");

assert.deepEqual(add("http://www.google.com",{test:"blah"}),"http://www.google.com?test=blah");
assert.deepEqual(add("http://www.google.com",{test:"blah with some special character's",again:"yes"}),"http://www.google.com?test=blah%20with%20some%20special%20character's&again=yes");
assert.deepEqual(add("http://www.google.com",{}),"http://www.google.com");
assert.deepEqual(add("http://www.google.com?already=has",{}),"http://www.google.com?already=has");
assert.deepEqual(add("http://www.google.com?already=has",{already:"hasnt"}),"http://www.google.com?already=hasnt");
assert.deepEqual(add("http://www.google.com?already=has",{embed:true,something:1}),"http://www.google.com?already=has&embed=true&something=1");



