/*
 * currentTime: The current time of the animation. This value is typically expressed in milliseconds.
 * start: The starting value of the animation. This is the value that the animation will start at.
 * change: The change in value of the animation. This is the difference between the starting value and the target value.
 * duration: The duration of the animation. This is the total length of time that the animation will take to complete.
*/
export function easeOut(
    currentTime: number,
    start: number,
    change: number,
    duration: number
): number {
    return -change * (currentTime /= duration) * (currentTime - 2) + start
}

/*
 * animationValue: The current value of the animation, as returned by the original ease-out function.
 * start: The starting value of the animation.
 * change: The change in value from the starting value to the ending value.
 * duration: The total duration of the animation, in milliseconds.
 */
export function easeOutElapsedTime(
    animationValue: number,
    start: number,
    change: number,
    duration: number
): number {
    return (animationValue - start + change) / (2 * change / duration)
}

/*
 * animationValue: The current value of the animation, as returned by the original ease-out function.
 * start: The starting value of the animation.
 * change: The change in value from the starting value to the ending value.
 * duration: The total duration of the animation, in milliseconds.
 */
export function revertEaseOut(currentTime: number, start: number, change: number, duration: number): number {
    // set the current time to be the remaining time
    currentTime = duration - currentTime
    // calculate the new value using the original easeOut function
    return easeOut(currentTime, start, -change, duration)
}

export function reverseEaseOut(
    outputValue: number,
    start: number,
    change: number,
    duration: number
): number {
    return duration * (2 - Math.sqrt(1 - (outputValue - start) / change)) / 2
}
