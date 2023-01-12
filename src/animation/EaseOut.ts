export default function easeOut(t: number, b: number, c: number, d: number): number {
    t /= d
    return -c * t * (t - 2) + b
}
