import { createStart } from '@tanstack/react-start';
import {
  authFunctionMiddleware,
  authRequestMiddleware,
} from './middleware/auth';

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [authRequestMiddleware],
    functionMiddleware: [authFunctionMiddleware],
  };
});
