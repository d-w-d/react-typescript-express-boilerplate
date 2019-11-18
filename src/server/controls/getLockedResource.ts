import { ILockedResourcePayload } from '../../common/dtoModels';

// Used in test as well
export const lockedResource = [1, 2, 3];

export function getLockedResource(): ILockedResourcePayload {
  return {
    resource: lockedResource
  };
}
