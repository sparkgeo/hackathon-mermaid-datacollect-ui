// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Site, Status } = initSchema(schema);

export {
  Site,
  Status
};