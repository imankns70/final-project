export interface Meal {
    id: number,
    name: string,
    ingredients: string[],
    userId: number,
    section: string
    $key: string
    $exist: () => boolean
}