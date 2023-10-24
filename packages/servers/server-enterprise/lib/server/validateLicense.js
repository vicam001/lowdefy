/*
  Copyright (C) 2023 Lowdefy, Inc
  Use of this software is governed by the Business Source License included in the LICENSE file and at www.mariadb.com/bsl11.

  Change Date: 2027-10-09

  On the date above, in accordance with the Business Source License, use
  of this software will be governed by the Apache License, Version 2.0.
*/
import { keygenValidateLicense } from '@lowdefy/node-utils';

const config = {
  dev: {
    accountId: 'bf35f4ae-53a8-45c6-9eed-2d1fc9f53bd6',
    productId: '4254760d-e760-4932-bb96-ba767e6ae780',
    publicKey: 'MCowBQYDK2VwAyEAN27y1DiHiEDYFbNGjgfFdWygxrVSetq6rApWq3psJZI=',
  },
  prod: {
    accountId: '',
    productId: '',
    publicKey: '',
  },
};

// TODO: Handle expired
// TODO: Cache results
// TODO: Check AUTH entitlement

async function validateLicense() {
  const license = await keygenValidateLicense({ config: config['dev'] });

  console.log(license);
  return {
    redirect: license.code !== 'VALID',
  };
}

export default validateLicense;
