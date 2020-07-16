import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  readonly baseAppUrl: string = 'https://marutibulkcarrier.com/demo/public/api/';
  readonly baseImageUrl: string = 'https://marutibulkcarrier.com/demo/public/uploads/';
  readonly apiUserName: string = 'admin';
  readonly apiPassword: string = '1234';

   constructor() { }
}
