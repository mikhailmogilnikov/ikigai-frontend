import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

import { NewPasswordForm } from '~/domains/global/features/auth';

// SearchParamError: [
//   {
//     "code": "invalid_type",
//     "expected": "string",
//     "received": "undefined",
//     "path": [
//       "verify"
//     ],
//     "message": "Required"
//   }
// ]

const newPasswordSearchSchema = z.object({
  verify: z.string(),
});

export const Route = createFileRoute('/auth/_guard/new-password')({
  component: RouteComponent,
  validateSearch: newPasswordSearchSchema,
  onError: (error) => {
    if (typeof error === 'object') {
      if (JSON.stringify(error).includes('{"routerCode":"VALIDATE_SEARCH"}')) {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw redirect({ to: '/auth/sign-in' });
      }
    }
  },
});

function RouteComponent() {
  return <NewPasswordForm className='mx-auto w-full max-w-md' />;
}
