import { IDemoPayload } from '../../common/dtoModels';

export function getDemoResource(): IDemoPayload {
  return { test: 'Hello World from Server' };
}
