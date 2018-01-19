const supertest = require('supertest');
const chai = require('chai');

global.app = 'https://ninjatask.herokuapp.com'
global.request = supertest(app)
global.expect = chai.expect;