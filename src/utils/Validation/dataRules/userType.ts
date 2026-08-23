export function isUserTypeValid(type: string) {
    return type.includes(type as "customer" || "admin");
}