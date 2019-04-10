import { Injectable } from '@angular/core';

import { SharedModule } from './shared.module';

@Injectable({providedIn: SharedModule})
export class NotificationService {
 sendNotification(message: string, type: string) {
    alert(message);
 }
}
