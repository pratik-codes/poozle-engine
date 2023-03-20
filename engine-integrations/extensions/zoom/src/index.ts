/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from 'fs';
import { resolve } from 'path';

import {
  AuthHeaderResponse,
  BaseRestExtensionNew,
  Config,
} from '@poozle/engine-edk';
import { SpecResponse } from '@poozle/engine-edk';

class ZoomExtension extends BaseRestExtensionNew {
  name = 'zoom';

  async authHeaders(_config: Config): AuthHeaderResponse {
    // Need to return the headers the API expects
    return {};
  }

  async getSchema(): Promise<string> {
    const schemaJSON = JSON.parse(
      fs.readFileSync(resolve('schema/schema.json'), 'utf8'),
    );

    return schemaJSON;
  }

  getSpec(): SpecResponse {
    const data = fs.readFileSync('./spec.json', 'utf8');

    return JSON.parse(data) as SpecResponse;
  }
}

export default ZoomExtension;