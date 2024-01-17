export function pad(str: string, size: number) {
    while (str.length < size) str = `0${str}`;
    return str;
}
