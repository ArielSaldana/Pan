import LocalStorage from './LocalStorage'

export default function localStorageFactory(instanceName: string): Object {
    return {
        instanceName,
        localStorageInstance: LocalStorage.getInstance(),
        add: function(key: string, value) {
            const fullyClassifiedName = instanceName + key
            this.localStorageInstance.add(fullyClassifiedName, value)
        },

        get: function(key: string) {
            const fullyClassifiedName = instanceName + key
            this.localStorageInstance.get(fullyClassifiedName)
        },

        remove: function(key: string) {
            const fullyClassifiedName = instanceName + key
            this.localStorageInstance.remove(fullyClassifiedName)
        }
    }
}
