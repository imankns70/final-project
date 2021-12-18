import { Meal } from "./meal";
import { Workout } from "./workout";

export interface ScheduelItem {
    meals: Meal[],
    workouts: Workout[],
    section: string, //morning  
   
}
