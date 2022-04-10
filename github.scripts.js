const { exec } = require("child_process");

const readLine = require("readline");

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("What is the commit message to github?\n", (message) => {
    exec(
        `git commit -a -m "${message ? message : "No message"}"`,
        (error, stdout, stderr) => {
            if (error) {
                console.log(`error occured: ${error.message}`);
            }
            if (stderr) {
                console.log(`stderr occured: ${stderr}`);
            }
            console.log(stdout);
            rl.close();
        }
    );
});
