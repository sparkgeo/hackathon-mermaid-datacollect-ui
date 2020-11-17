// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Site } = initSchema(schema);

export {
  Site
};