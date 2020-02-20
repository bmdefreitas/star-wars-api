import chai from 'chai';
import supertest from 'supertest';

import app from '../../src/app';

global.app = app;
global.supertest = supertest;
global.expect = chai.expect;
global.assert = chai.assert;
global.request = supertest(app);
