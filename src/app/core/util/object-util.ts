import { HttpParams } from "@angular/common/http";
import { AppConstants } from '../constants/app-constants';


export function getPaginationHttpParams(pageNo: number, pageSize: number) {
    return new HttpParams()
        .set(AppConstants.PAGE_NO, pageNo)
        .set(AppConstants.PAGE_SIZE, pageSize);
}
