export type RESTClient<T> = {
    baseUrl: null | string;
    suffix: string;
    data: T;
};
export declare function deploy(lambda: Lambda<any, any>): void;
export declare class Lambda<T, U> implements Microservice<T, U>, Deployable {
    handler: ((input: T) => Promise<U>) | undefined;
    constructor(handler: (input: T) => Promise<U>);
    setHandler(handler: (input: T) => Promise<U>): void;
    trigger(input: T): Promise<U>;
    deploy(): void;
}
export declare abstract class Microservice<T, U> {
    abstract setHandler(handler: (input: T) => Promise<U>): void;
    abstract trigger(input: T): Promise<U>;
}
export declare abstract class Deployable {
    abstract deploy(): void;
}
