import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AsyncMockService {
  asyncMock<T>(cb: () => T, delay_ms: number) {
    return new Promise<T>((resolve) =>
      setTimeout(() => resolve(cb()), delay_ms)
    );
  }
}
