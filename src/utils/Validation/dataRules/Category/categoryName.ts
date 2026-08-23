export function isCategoryNameValid(name: string): boolean {
    return name.length <= 25 && name.length > 0;
}