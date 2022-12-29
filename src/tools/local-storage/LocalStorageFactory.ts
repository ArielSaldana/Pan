import toSnakeCase from '../../utils/ToSnakeCase'
import capitalize from '../../utils/Capitalize'
import LocalStorage from './LocalStorage'

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
            const data = this.localStorageInstance.get(fullyClassifiedName)
            if (data === undefined || data === null) {
                return undefined
            }
            return JSON.parse(data)
        },

        remove: function(key: string) {
            const fullyClassifiedName = toSnakeCase(instanceName + capitalize(key))
            this.localStorageInstance.remove(fullyClassifiedName)
        }
    }
}
