export declare function greet(name: string): string;
export declare function farewell(name: string): string;
export declare const helper: {
    description: string;
    doSomething: () => string;
};
export declare class Lambda<T> implements Microservice<T> {
    name: string;
    handler: ((input: T, outputs: Outputs) => Promise<boolean>) | undefined;
    outputs: Outputs;
    constructor(name: string);
    addOutput(output: Microservice<any>): boolean;
    setHandler(handler: (input: T, outputs: Outputs) => Promise<boolean>): void;
    getName(): string;
    trigger(input: T): Promise<boolean>;
}
export interface Outputs {
    [index: string]: Microservice<any>;
}
export declare abstract class Microservice<T> {
    abstract addOutput(output: Microservice<any>): boolean;
    abstract setHandler(handler: (input: T, outputs: Outputs) => Promise<boolean>): void;
    abstract getName(): string;
    abstract trigger(input: T): Promise<boolean>;
}
