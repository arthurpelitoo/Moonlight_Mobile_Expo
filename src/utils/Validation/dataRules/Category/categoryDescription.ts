export function isDescriptionValid(description: string): boolean {
    return description.length <= 255 && description.length > 0;
}