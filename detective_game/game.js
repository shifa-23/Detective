const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function slowPrint(text, delay = 20) {
  return new Promise((resolve) => {
    let i = 0;
    function printNext() {
      if (i < text.length) {
        process.stdout.write(text.charAt(i));
        i++;
        setTimeout(printNext, delay);
      } else {
        process.stdout.write('\n');
        resolve();
      }
    }
    printNext();
  });
}

async function intro() {
  await slowPrint("Welcome to TERMINAL DETECTIVE: Case of the Vanished Violin");
  await slowPrint("You are Detective Riley, called to solve the theft of a priceless violin.");
  await slowPrint("You arrive at the grand backstage of Harmonium Hall...");
  choice1();
}

function choice1() {
  slowPrint("\nWhere do you want to begin?\n1. Interview the Maestro\n2. Inspect the Violin Case\n3. Search the Dining Room").then(() => {
    rl.question("> ", (answer) => {
      if (answer === '1') {
        slowPrint("\n The Maestro is frantic: 'It vanished during intermission!'").then(choice2);
      } else if (answer === '2') {
        slowPrint("\n The case is unlocked—no forced entry. An inside job?").then(choice2);
      } else if (answer === '3') {
        slowPrint("\n Food in dining room. ...").then(choice2);
      } else {
        slowPrint("Invalid choice.").then(choice1);
      }
    });
  });
}

function choice2() {
  slowPrint("\nWho do you want to question?\n1. Stagehand\n2. Violinist's Rival\n3. Janitor").then(() => {
    rl.question("> ", (answer) => {
      if (answer === '1') {
        slowPrint("\n 'I heard arguing earlier... maybe check the dining room?'").then(clueRoom);
      } else if (answer === '2') {
        slowPrint("\n'Such a shame. But perhaps the show must go on without them.'").then(clueRoom);
      } else if (answer === '3') {
        slowPrint("\n 'Someone dropped a glove near the exit!'").then(clueRoom);
      } else {
        slowPrint("Invalid choice.").then(choice2);
      }
    });
  });
}

function clueRoom() {
  slowPrint("\nWhat do you do next?\n1. Search the trash\n2. Confront the rival\n3. Call backup").then(() => {
    rl.question("> ", (answer) => {
      if (answer === '1') {
        slowPrint("\n🗑You find a glove with the rival's initials!").then(() => endGame("win"));
      } else if (answer === '2') {
        slowPrint("\n Caught off guard, the rival confesses!").then(() => endGame("win"));
      } else if (answer === '3') {
        const outcome = Math.random() > 0.5 ? "win" : "fail";
        if (outcome === "win") {
          slowPrint("\n The police catch the rival at the gate!").then(() => endGame("win"));
        } else {
          slowPrint("\n Too late! The thief has escaped.").then(() => endGame("fail"));
        }
      } else {
        slowPrint("Invalid choice.").then(clueRoom);
      }
    });
  });
}

function endGame(result) {
  if (result === "win") {
    slowPrint("\n CASE CLOSED! You recovered the violin and caught the thief.");
  } else {
    slowPrint("\n CASE FAILED. The violin and thief are gone.");
  }
  rl.question("Play again? (y/n): ", (answer) => {
    if (answer.toLowerCase() === 'y') {
      intro();
    } else {
      slowPrint("Thanks for playing!").then(() => rl.close());
    }
  });
}

// Start the game
intro();
