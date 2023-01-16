/* Define the easing function
currentTime: The current time of the animation. This value is typically expressed in milliseconds.
start: The starting value of the animation. This is the value that the animation will start at.
change: The change in value of the animation. This is the difference between the starting value and the target value.
duration: The duration of the animation. This is the total length of time that the animation will take to complete.
*/
export default function easeInOutQuad(
    time: number,
    startingValue: number,
    targetValue: number,
    duration: number
): number {
    time /= duration / 2
    if (time < 1) return targetValue / 2 * time * time + startingValue
    time--
    return -targetValue / 2 * (time * (time - 2) - 1) + startingValue
}
