const processArguments = process.argv.slice(2);

console.log({ task: processArguments[0], branch: processArguments[1] });