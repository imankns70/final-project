export interface Workout {
    id:number,
    name:string,
    type:string,
    strength:Strength,
    endurance:Endurance
}
interface Strength{
    Reps:number,
    Sets:number,
    Weight:number,
}
 
interface Endurance{
    Distance:number,
    Duration:number,
   
}