import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Store } from 'store';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

@Injectable()
export class MealsService {

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {


   }
}
