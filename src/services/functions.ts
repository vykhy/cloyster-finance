export function hasEmpty(array: Array<any>){
    return array.some(item => item === '' || item === null)
}