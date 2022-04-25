const path = require("path");

const spawn = require("cross-spawn");

const processArguments = process.argv.slice(2);

const TASK_NAME = processArguments[0];
const BASE_BRANCH_NAME = processArguments[1];
const ROOT_PATH = path.resolve(__dirname, "..");
const ENCODING_TYPE = "utf8";
const NEW_LINE_CHAR = "\n";


class CliLogs {
  constructor() {
    this._logs = [];
    this.log = this.log.bind(this);
  }

  log(log) {
    const cleanLog = log.trim();
    if (cleanLog.length) {
      this._logs.push(cleanLog);
    }
  }

  get logs() {
    return this._logs;
  }

  get joinedLogs() {
    return this.logs.join(NEW_LINE_CHAR);
  }
}

function pnpmRun(...args) {
  const logData = new CliLogs();
  let pnpmProcess;
  return new Promise((resolve, reject) => {
    const processOptions = {
      cwd: ROOT_PATH,
      env: process.env,
    };

    pnpmProcess = spawn("pnpm", args, processOptions);

    pnpmProcess.stdin.setEncoding(ENCODING_TYPE);
    pnpmProcess.stdout.setEncoding(ENCODING_TYPE);
    pnpmProcess.stderr.setEncoding(ENCODING_TYPE);
    pnpmProcess.stdout.on("data", logData.log);
    pnpmProcess.stderr.on("data", logData.log);

    pnpmProcess.on("close", (code) => {
      if (code !== 0) {
        reject();
      } else {
        resolve(logData.joinedLogs);
      }
    });
  });
}

function commaSeparatedListToArray(str) {
  return str.trim().split(",").map(element => element.trim()).filter(element => !!element.length);
}

function getAffectedCommandResult(str) {
  const outputLines = str.trim().split(/\r?\n/);
  if(outputLines.length > 2) {
    return outputLines.slice(-1)[0];
  }
  return "";
}

async function affectedProjectsContainingTask(taskName, baseBranch) {
  // pnpm nx print-affected -- --target=[task] --base [base branch] --select=tasks.target.project
  return commaSeparatedListToArray(getAffectedCommandResult(
    await pnpmRun("nx", "print-affected", "--", "--target", taskName, "--base", baseBranch, "--select=tasks.target.project")
  ));
}

async function printAffectedProjectsContainingTask() {
  console.log(JSON.stringify(await affectedProjectsContainingTask(TASK_NAME, BASE_BRANCH_NAME)));
}

printAffectedProjectsContainingTask().catch(error => {
  console.error(error);
  process.exit(1);
});
