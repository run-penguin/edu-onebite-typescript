// void

function func1(): string {
    return "hello";
}

function func2(): void {
    console.log("hello");
}

// never

function func3(): never {
    while (true) {}
}

function func4(): never {
    throw new Error();
}