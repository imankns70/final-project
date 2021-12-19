import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, distinctUntilChanged, map } from 'rxjs/operators';
import { Meal } from './app/models/meal';
import { ScheduelItem } from './app/models/schedule-item';
import { User } from './app/models/user';
import { Endurance, Strength, Workout } from './app/models/workout';


export interface State {
  user: User,
  meals: Meal[],
  date: Date
  selected: any,
  list: Workout[] | Meal[],
  workouts: Workout[],
  schedule: ScheduelItem[],
  [key: string]: any
}

const initUser: User = {
  id: 0,
  email: '',
  password: '',
  authenticated: false
}

const initUMeal: Meal = {
  id: 0,
  ingredients: [],
  $exist: () => false,
  $key: "",
  name: "",
  section: "",
  userId: 0

}

const initEndurance: Endurance = {
  Distance: 0,
  Duration: 0
}

const initStrength: Strength = {
  Sets: 0,
  Reps: 0,
  Weight: 0,
}
const initUWorkout: Workout = {
  id: 0,
  endurance: initEndurance,
  strength: initStrength,
  $exist: () => false,
  $key: "",
  name: "",
  type: ""

}
const state: State = {
  user: initUser,
  meals: [],
  date: new Date,
  selected: undefined,
  list: [],
  workouts: [],
  schedule: []
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(
    distinctUntilChanged()
  );

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
