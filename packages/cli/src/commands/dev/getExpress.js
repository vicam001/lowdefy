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

import path from 'path';
import express from 'express';
import reload from 'reload';

async function getExpress({ context, gqlServer, options }) {
  const app = express();
  app.set('port', parseInt(options.port));
  gqlServer.applyMiddleware({ app, path: '/api/graphql' });
  const reloadReturned = await reload(app, { route: '/api/dev/reload.js' });
  app.use(express.static(path.join(__dirname, 'shell')));
  app.use('/api/dev/version', (req, res) => {
    res.json(context.lowdefyVersion);
  });
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, 'shell/index.html'));
  });
  return { expressApp: app, reloadFn: reloadReturned.reload };
}

export default getExpress;
