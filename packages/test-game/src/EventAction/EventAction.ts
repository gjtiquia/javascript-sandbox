type EventActionListener = () => void;

export class EventAction {
    private _listeners: EventActionListener[];

    constructor() {
        this._listeners = [];
    }

    public addListener(callback: EventActionListener): void {
        this._listeners.push(callback);
    }

    public removeListener(callback: EventActionListener): void {
        this._listeners = this._listeners.filter(x => x === callback);
    }

    public invoke(): void {
        this._listeners.forEach(callback => callback())
    }
}