export default function addEvent (eventName, klazz): any {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (klazz !== undefined) {
            klazz.events.set(
                eventName,
                {
                    initFunction: () => {
                        document.addEventListener(eventName, descriptor.value.bind(klazz))
                    },
                    destroyFunction: () => {
                        document.removeEventListener(eventName, descriptor.value.bind(klazz))
                    },
                    callbacks: []
                }
            )

            const original = descriptor.value
            descriptor.value = function (...args) {
                const result = original.call(this, ...args)
                klazz.emit(eventName, result, args[0])
            }
        }
    }
}
