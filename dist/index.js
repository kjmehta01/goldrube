"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Microservice = exports.Lambda = exports.helper = void 0;
exports.greet = greet;
exports.farewell = farewell;
function greet(name) {
    return `Hello, ${name}!`;
}
function farewell(name) {
    return `Goodbye, ${name}!`;
}
exports.helper = {
    description: "A helper object with useful utilities.",
    doSomething: () => "I'm doing something useful!",
};
class Lambda {
    constructor(name) {
        this.name = "";
        this.outputs = {};
        this.name = name;
    }
    addOutput(output) {
        this.outputs[output.getName()] = output;
        return true;
    }
    setHandler(handler) {
        this.handler = handler;
    }
    getName() {
        return this.name;
    }
    trigger(input) {
        if (this.handler === undefined) {
            return new Promise(function (resolve) {
                resolve(false);
            });
        }
        return this.handler(input, this.outputs);
    }
}
exports.Lambda = Lambda;
class Microservice {
}
exports.Microservice = Microservice;
