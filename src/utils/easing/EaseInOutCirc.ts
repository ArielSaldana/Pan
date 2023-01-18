/*
 * The variable x represents the absolute progress of the animation in the bounds of 0
 * (beginning of the animation) and 1 (end of animation).
 * https://easings.net/
 */
export function EaseInOutCirc(x: number): number {
    return x < 0.5
        ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
        : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2
}
