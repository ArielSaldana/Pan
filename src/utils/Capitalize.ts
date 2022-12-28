export default function capitalize(str: string): string {
    let capitalizedString = str.charAt(0).toUpperCase()
    capitalizedString += str.slice(1, str.length)
    return capitalizedString
}
