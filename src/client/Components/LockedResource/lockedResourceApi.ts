import { makeApiRequest } from '@client/Utils/makeApiRequest';
import { ILockedResourcePayload } from '@common/dtoModels';

export const lockedResourceApi = async (jwtToken: string) => {
  return await makeApiRequest<ILockedResourcePayload>({
    apiRoute: '/locked',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + jwtToken + ''
    }
  });
};
