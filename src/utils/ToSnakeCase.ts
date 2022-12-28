export default function toSnakeCase(str: string): string {
    let snakeCaseStr = ''
    for (const char of str) {
        if (char === ' ') {
            snakeCaseStr += '_'
        } else if (char !== char.toLowerCase()) {
            snakeCaseStr += `_${char.toLowerCase()}`
        } else {
            snakeCaseStr += char
        }
    }
    return snakeCaseStr
}
