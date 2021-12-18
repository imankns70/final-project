import { ScheduelItem } from "./schedule-item";

export interface ScheduleList {
    morning?: ScheduelItem,
    lunch?: ScheduelItem,
    evening?: ScheduelItem,
    dinner?: ScheduelItem,
    [key: string]: any
}