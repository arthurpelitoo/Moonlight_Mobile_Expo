export function isLaunchDateValid(launch_date: string): boolean{
    return launch_date.trim().length > 0; //(a data de lançamento tem de ser maior que 0, ou seja, tem de estar marcada.)
}