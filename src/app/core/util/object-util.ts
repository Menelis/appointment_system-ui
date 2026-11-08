import { HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConstants } from '../constants/app-constants';

import { v7 as uuidv7 } from 'uuid';

export function getPaginationHttpParams(pageNo: number, pageSize: number) {
  return new HttpParams()
    .set(AppConstants.PAGE_NO, pageNo)
    .set(AppConstants.PAGE_SIZE, pageSize);
}

export function getHttpHeadersDisableCache() {
  return new HttpHeaders({
    'Cache-Control':
      'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
    Pragma: 'no-cache',
    Expires: '0',
  });
}

export function appendCorrelationId(headers: HttpHeaders) {
  const xCorrelationId: string = uuidv7();
  headers = headers.set(AppConstants.X_CORRELATION_ID, xCorrelationId);
  return headers;
}
