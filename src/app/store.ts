import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, distinctUntilChanged, map } from 'rxjs/operators';
import { Meal } from './models/Meal';
import { User } from './models/user';


export interface State {
  user: User,
  meals: Meal[],
  [key: string]: any
}

const state: State = {
  user: undefined,
  meals: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(
    distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    debugger
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    debugger
    this.subject.next({ ...this.value, [name]: state });
  }

}
