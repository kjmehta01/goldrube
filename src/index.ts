import { execSync } from "child_process";
import { test } from "./deploy";

export type RESTClient<T> = {
    baseUrl: null | string,
    suffix: string,
    data: T
}

export function deploy(lambda: Lambda<any,any>): void {

}

export class Lambda<T, U> implements Microservice<T, U>, Deployable {
    handler: ((input: T) => Promise<U>) | undefined;

    constructor(handler: (input: T) => Promise<U>) {
        this.handler = handler;
    }

    setHandler(handler: (input: T) => Promise<U>) {
        this.handler = handler;
        console.log('SAM: ' + checkSamInstalled());
    }

    trigger(input: T): Promise<U> {
        if (this.handler === undefined) {
            throw new Error("function does not have handler defined")
        }

        return this.handler(input);
    }

    deploy(){
        
    }
}

export abstract class Microservice<T, U> {
    //abstract addOutput(output: Microservice<any>): boolean;
    abstract setHandler(handler: (input: T) => Promise<U>): void;
    abstract trigger(input: T): Promise<U>;
}

export abstract class Deployable {
    abstract deploy(): void;
}

function runCommand(command: string): string {
    try {
      console.log(`Executing: ${command}`);
      const output = execSync(command, { stdio: "pipe" }).toString();
      console.log(output);
      return output;
    } catch (error) {
      console.error(`Error executing command: ${command}`);
      throw new Error((error as Error).message);
    }
  }

function checkSamInstalled(): boolean {
    try {
      runCommand("sam --version");
      return true;
    } catch (error) {
      console.error("AWS SAM CLI is not installed or not found in PATH.");
      return false;
    }
  }