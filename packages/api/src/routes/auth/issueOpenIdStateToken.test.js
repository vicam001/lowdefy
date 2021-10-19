/*
  Copyright 2020-2021 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/*
  Copyright 2020-2021 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import jwt from 'jsonwebtoken';

import testContext from '../../test/testContext';
import issueOpenIdStateToken from './issueOpenIdStateToken';

const secrets = {
  JWT_SECRET: 'JWT_SECRET',
};

const RealDate = Date.now;

const mockNow = jest.fn();
mockNow.mockImplementation(() => 1000);

beforeEach(() => {
  global.Date.now = mockNow;
});

afterAll(() => {
  global.Date.now = RealDate;
});

test('issueOpenIdStateToken', async () => {
  const stateToken = issueOpenIdStateToken(testContext({ host: 'host', secrets }), {
    input: { i: true },
    pageId: 'pageId',
    urlQuery: { u: true },
  });
  const claims = jwt.verify(stateToken, 'JWT_SECRET', {
    algorithms: ['HS256'],
    audience: 'host',
    issuer: 'host',
  });
  expect(claims).toEqual({
    aud: 'host',
    exp: 301, // 5min
    iat: 1,
    input: { i: true },
    iss: 'host',
    lowdefy_openid_state_token: true,
    pageId: 'pageId',
    urlQuery: { u: true },
  });
});

test('issueOpenIdStateToken, no location data', async () => {
  const stateToken = issueOpenIdStateToken(testContext({ host: 'host', secrets }), {});
  const claims = jwt.verify(stateToken, 'JWT_SECRET', {
    algorithms: ['HS256'],
    audience: 'host',
    issuer: 'host',
  });
  expect(claims).toEqual({
    aud: 'host',
    exp: 301, // 5min
    iat: 1,
    iss: 'host',
    lowdefy_openid_state_token: true,
  });
});
