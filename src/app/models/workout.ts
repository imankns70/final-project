export interface Workout {
    id:number,
    name:string,
    type:string,
    strength:Strength,
    endurance:Endurance,
    $key: string
    $exist: () => boolean
}
export interface Strength{
    Reps:number,
    Sets:number,
    Weight:number,
}
 
export interface Endurance{
    Distance:number,
    Duration:number,
   
}