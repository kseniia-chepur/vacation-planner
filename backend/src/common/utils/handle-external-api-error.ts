import { BadGatewayException } from '@nestjs/common';
import { ERROR_MESSAGES } from '../constants/error-messages.js';

export const handleExternalApiError = (response: Response): void => {
  if (!response.ok) {
    throw new BadGatewayException(
      response.status === 401
        ? ERROR_MESSAGES.API_KEY_INVALID
        : ERROR_MESSAGES.EXTERNAL_API_REQUEST_FAILED,
    );
  }
};
