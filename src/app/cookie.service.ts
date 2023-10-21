import { Injectable } from '@angular/core';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  static get(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private ngxCookieService: NgxCookieService) {}

  // Get a cookie value by its key
  get(key: string): string {
    return this.ngxCookieService.get(key);
  }

  // Set a cookie with a key, value, and expiration time in seconds
  set(key: string, value: string, expireSeconds: number): void {
    this.ngxCookieService.set(key, value, expireSeconds, '/');
  }

  // Delete a cookie by its key
  delete(key: string): void {
    this.ngxCookieService.delete(key, '/');
  }
}
