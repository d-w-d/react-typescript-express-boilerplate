import { makeApiRequest } from '@client/Utils/makeApiRequest';
import { IDemoPayload } from '@common/dtoModels';

export const demoApi = async () => {
  return await makeApiRequest<IDemoPayload>({
    apiRoute: '/',
    method: 'GET'
  });
};
