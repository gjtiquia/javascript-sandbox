import { EventAction } from "./EventAction";

describe("Event Test Suite", () => {
    it("can be subscribed to", () => {
        let callCount = 0;

        const event = new EventAction();
        event.addListener(() => callCount++);
        event.invoke();

        expect(callCount).toBe(1);
    })

    it("can be unsubscribed to", () => {
        let callCount = 0;

        const event = new EventAction();

        event.addListener(() => callCount++);
        event.invoke();

        expect(callCount).toBe(1);

        event.removeListener(() => callCount++);
        event.invoke();

        expect(callCount).toBe(1); // Remain unchanged
    })
})