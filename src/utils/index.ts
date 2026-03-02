function threeDigits(num: number): string {
    return String(num).padStart(3, "0");
}

function capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { threeDigits, capitalize };
