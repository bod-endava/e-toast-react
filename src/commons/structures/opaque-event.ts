export type OpaqueEvent<T> = {
    target: {
        type: string,
        value: T,
        name: string,
    }
}

export type OpaqueEventHandler<T> = (e: OpaqueEvent<T>) => void

export const createEvent = <T>(type: string, name: string, value: T): OpaqueEvent<T> => ({
    target: { type, name, value }
})