export function greet(name: string): string {
    return `Hello, ${name}!`;
}

export function farewell(name: string): string {
    return `Goodbye, ${name}!`;
}

export const helper = {
    description: "A helper object with useful utilities.",
    doSomething: (): string => "I'm doing something useful!",
};

export class Lambda<T> implements Microservice<T> {
    name: string = "";
    handler: ((input: T, outputs: Outputs) => Promise<boolean>) | undefined;
    outputs: Outputs = {};

    constructor(name: string) {
        this.name = name;
    }

    addOutput(output: Microservice<any>): boolean {
        this.outputs[output.getName()] = output;
        return true;
    }

    setHandler(handler: (input: T, outputs: Outputs) => Promise<boolean>) {
        this.handler = handler;
    }

    getName(): string {
        return this.name;
    }

    trigger(input: T): Promise<boolean> {
        if (this.handler === undefined) {
            return new Promise(function (resolve) {
                resolve(false);
            });
        }

        return this.handler(input, this.outputs);
    }
}

export interface Outputs {
    [index: string]: Microservice<any>;
}

export abstract class Microservice<T> {
    abstract addOutput(output: Microservice<any>): boolean;
    abstract setHandler(handler: (input: T, outputs: Outputs) => Promise<boolean>): void;
    abstract getName(): string;
    abstract trigger(input: T): Promise<boolean>;
}