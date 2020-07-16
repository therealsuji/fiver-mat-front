import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  readonly baseAppUrl: string = 'https://88733ce25096.ngrok.io/fiver-matrinmony-backend/public/api/';
  readonly baseImageUrl: string = 'https://88733ce25096.ngrok.io/fiver-matrinmony-backend/public/uploads/';
  readonly apiUserName: string = 'admin';
  readonly apiPassword: string = '1234';

   constructor() { }
}
