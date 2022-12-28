export default class LocalStorage {
    public static instance: LocalStorage
    private constructor () { if (!this.isLocalStorageAvailable()) { throw Error('local storage not enabled') } }
    public static getInstance(): LocalStorage {
        if (LocalStorage.instance === undefined) {
            return new LocalStorage()
        }
        return LocalStorage.instance
    }

    isLocalStorageAvailable(): boolean {
        return window.localStorage !== undefined
    }

    add(key: string, value: any): void {
        window.localStorage.setItem(key, value)
    }

    get(key: string): any {
        return window.localStorage.getItem(key)
    }

    remove(key: string): void {
        window.localStorage.removeItem(key)
    }
}
