import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, distinctUntilChanged, map } from 'rxjs/operators';
import { Meal } from './models/Meal';
import { User } from './models/user';
import { Workout } from './models/workout';


export interface State {
  user: User,
  meals: Meal[],
  workouts: Workout[],
  [key: string]: any
}

const state: State = {
  user: undefined,
  meals: undefined,
  workouts: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {

    return this.store.pipe(
   pluck(name));
  }

  set(name: string, state: any) {
   
    this.subject.next({ ...this.value, [name]: state });
  }
   

}
