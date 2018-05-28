import { AngularFireDatabase } from 'angularfire2/database';
import { Schedule } from './../../models/schedule.model';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';

@Injectable()
export class ScheduleProvider extends BaseProvider {

  constructor(
      public db : AngularFireDatabase)
  {
    super();
    console.log('Hello ScheduleProvider Provider');
  }

  create(schedule: Schedule , userId: string, independentId: string): Promise<void> {
    return this.db.object<Schedule>(`/schedules/${userId}/${independentId}`).set(schedule).catch(this.handlePromiseError);
  }

  unavailableHour(schedule: Schedule,independentId : string): Promise<void> {
    return this.db.object<Schedule>(`/hoursUnavailable/${independentId}/${(schedule.date).toString().replace(/\//g, '-')}/${schedule.time}`).set(schedule).catch(this.handlePromiseError);
  }


}


