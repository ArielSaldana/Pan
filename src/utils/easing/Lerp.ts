export default function lerp(start: number, end: number, t: number): number {
    return (1 - t) * start + t * end
}

export function lerpTimeElapsed(currentValue: number, start: number, end: number): number {
    return (currentValue - start) / (end - start)
}
