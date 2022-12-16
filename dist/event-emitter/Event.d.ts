export interface Event {
    initFunction: () => void;
    destroyFunction: () => void;
    callbacks: Function[];
}
