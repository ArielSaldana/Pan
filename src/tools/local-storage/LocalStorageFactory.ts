import toSnakeCase from '../../ToSnakeCase'
import LocalStorage from './LocalStorage'
import capitalize from '../../Capitalize'

export default function localStorageFactory(instanceName: string): any {
    return {
        instanceName,
        localStorageInstance: LocalStorage.getInstance(),
        add: function(key: string, value) {
            const fullyClassifiedName = toSnakeCase(instanceName + capitalize(key))
            if (typeof value === 'object') {
                this.localStorageInstance.add(fullyClassifiedName, JSON.stringify(value))
            } else {
                this.localStorageInstance.add(fullyClassifiedName, value)
            }
        },

        get: function(key: string): any {
            const fullyClassifiedName = toSnakeCase(instanceName + capitalize(key))
            return JSON.parse(this.localStorageInstance.get(fullyClassifiedName))
        },

        remove: function(key: string) {
            const fullyClassifiedName = toSnakeCase(instanceName + capitalize(key))
            this.localStorageInstance.remove(fullyClassifiedName)
        }
    }
}
