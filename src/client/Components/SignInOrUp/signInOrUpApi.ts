import { makeApiRequest } from '@client/Utils/makeApiRequest';
import { ISignInOrUpPayload } from '@common/dtoModels';

export const signInOrUpApi = async (
  params: { username: string; password: string },
  isSigningIn: boolean
) => {
  return await makeApiRequest<ISignInOrUpPayload>({
    apiRoute: !!isSigningIn ? '/signin' : '/signup',
    method: 'POST',
    body: JSON.stringify({
      username: params.username,
      password: params.password
    })
  });
};
