"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deployable = exports.Microservice = exports.Lambda = void 0;
exports.deploy = deploy;
const child_process_1 = require("child_process");
function deploy(lambda) {
}
class Lambda {
    constructor(handler) {
        this.handler = handler;
    }
    setHandler(handler) {
        this.handler = handler;
        console.log('SAM: ' + checkSamInstalled());
    }
    trigger(input) {
        if (this.handler === undefined) {
            throw new Error("function does not have handler defined");
        }
        return this.handler(input);
    }
    deploy() {
    }
}
exports.Lambda = Lambda;
class Microservice {
}
exports.Microservice = Microservice;
class Deployable {
}
exports.Deployable = Deployable;
function runCommand(command) {
    try {
        console.log(`Executing: ${command}`);
        const output = (0, child_process_1.execSync)(command, { stdio: "pipe" }).toString();
        console.log(output);
        return output;
    }
    catch (error) {
        console.error(`Error executing command: ${command}`);
        throw new Error(error.message);
    }
}
function checkSamInstalled() {
    try {
        runCommand("sam --version");
        return true;
    }
    catch (error) {
        console.error("AWS SAM CLI is not installed or not found in PATH.");
        return false;
    }
}
