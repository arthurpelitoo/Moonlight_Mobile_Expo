export function isNameValid(name: string): boolean {
    return name.length <= 16 && name.length > 0;
}