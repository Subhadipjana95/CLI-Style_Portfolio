#!/usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";
import terminalLink from "terminal-link";
import gradient from "gradient-string";
import cliWidth from "cli-width";
import cfonts from "cfonts";
import stripAnsi from "strip-ansi";
import readline from "readline";

// Brand gradient
const brandGradient = gradient(["#8FC47B", "#b56b36"]);

// ----------------------
// STATIC DATA (Editable)
// ----------------------

const DATA = {
  projects: [
    {
      name: "NIXGn - Next-Gen Intelligence Execution Group",
      live: "https://nixgn.com",
      github: "private"
    },
    {
      name: "Next.Ref_Alumni-Connect",
      live: "https://next-reff-alumni-connect.vercel.app",
      github: "https://github.com/Subhadipjana95/Next.Ref_Alumni-Connect"
    },
    {
      name: "Kisan-Mitra",
      live: "https://kisan-mitra-app.vercel.app",
      github: "https://github.com/Subhadipjana95/Kisan-Mitra"
    },
    {
      name: "EnviroMat",
      live: "https://enviro-mat.vercel.app",
      github: "https://github.com/Subhadipjana95/EnviroMat"
    }
  ],
  skills: [
    "Next.js",
    "React.js",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP",
    "Three.js",
    "WebGL",
    "HTML",
    "CSS",
    "Figma",
    "Canva",
    "Adobe Illustrator",
    "Firebase",
    "MongoDB",
    "Git",
    "GitHub",
    "Vercel",
    "Netlify",
    "Search Engine Optimization (SEO)",
    "Performance Optimization",
    "Cross-Browser Compatibility",
    "Responsive Design",
    "GraphicDesign",
    "UI/UX Design Principles",
    "C",
    "Java",
    "Python",
  ],
  experience: [
    "Co-Founder @ NIXGN",
    "Design Core Team Member @GDG on Campus NSEC",
    "4x Hackathon Winner",
    "Freelancer - UI/UX Design & Frontend Deve"
  ],
  hackathons: [
    "🥇 Think 3D – 1st Place",
    "Cosmo Hack 1.0 - 2nd Runner Up & Aptos Track Winner",
    "HackSpire'25 - UI/UX Track Winner",
    "Smart Make-A-Thon - 2nd Runner Up",
  ],
  education: [
    "B.Tech CSE – Netaji Subhash Engineering College(MAKAUT) | 2023-2027"
  ]
};

// ----------------------
// INFO BOX
// ----------------------

const info = `
${chalk.bold("🚀 Co-Founder @NIXGN")}
${chalk.gray("Design Engineer | UI/UX Designer | Frontend Dev")}

${chalk.cyan("🌐 Portfolio")} ${terminalLink("Portfolio Link", "https://a063.xyz")}
${chalk.green("🐙 GitHub")} ${terminalLink("GitHub Profile Link", "https://github.com/Subhadipjana95")}
${chalk.blue("💼 LinkedIn")} ${terminalLink("LinkedIn Profile Link", "https://linkedin.com/in/subhadipjana095")}

${chalk.yellow("Run:")} npx subhadip-a063
`;

// ----------------------
// RENDER UI
// ----------------------

function render() {
  console.clear();
  const width = cliWidth();

  const ascii = cfonts.render("SUBHADIP", {
    font: "block",
    align: "left",
    letterSpacing: 1,
    lineHeight: 1,
  });

  const bannerLines = ascii.string.split("\n");
  const maxLineLength = Math.max(...bannerLines.map(l => l.length));

  const centeredBanner = bannerLines
    .map(line => {
      const paddedLine = line.padEnd(maxLineLength);
      const padding = Math.max(0, Math.floor((width - maxLineLength) / 2));
      return " ".repeat(padding) + brandGradient(paddedLine);
    })
    .join("\n");

  console.log(centeredBanner);

  // Prompt text
  const promptText = "sandbox-exec (minimal)   subhadip-a063 CLI v2.0";
  const promptPadding = Math.max(0, Math.floor((width - promptText.length) / 2));

  console.log(" ".repeat(promptPadding) + chalk.gray(promptText));
  console.log("");

  // Info box
  const box = boxen(info.trim(), {
    padding: 1,
    borderStyle: "round",
    borderColor: "#8FC47B",
  });

  const boxLines = box.split("\n");

  const centeredBox = boxLines
    .map(line => {
      const visibleLength = stripAnsi(line).length;
      const padding = Math.max(0, Math.floor((width - visibleLength) / 2));
      return " ".repeat(padding) + line;
    })
    .join("\n");

  console.log(centeredBox);

}

// ----------------------
// INTERACTIVE MODE
// ----------------------

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startInteractiveMode() {
  const width = cliWidth();
  const boxWidth = 50;
  const pad = Math.max(0, Math.floor((width - boxWidth) / 2));
  const indent = " ".repeat(pad);
  const b = chalk.hex("#8FC47B");

  // Draw top border and hint
  console.log("");
  console.log(indent + b("╭" + "─".repeat(boxWidth - 2) + "╮"));
  console.log(indent + b("│") + chalk.gray(" Type: 'help' to know all commands".padEnd(boxWidth - 2)) + b("│"));
  console.log(indent + b("├" + "─".repeat(boxWidth - 2) + "┤"));
  console.log(indent + b("│") + " ".repeat(boxWidth - 2) + b("│"));
  console.log(indent + b("╰" + "─".repeat(boxWidth - 2) + "╯"));

  // Move cursor up to the empty input row
  process.stdout.write("\x1B[2F");
  process.stdout.write("\r");

  // Prompt with left border character
  const promptPrefix = indent + b("│ ") + chalk.green("❯ ");

  rl.question(promptPrefix, (answer) => {
    // Move cursor past the box before clearing
    process.stdout.write("\n\n");
    handleCommand(answer.trim().toLowerCase());
  });
}

function handleCommand(cmd) {
  console.clear();
  const width = cliWidth();

  function printCenteredBox(title, items, isProjects = false) {
    // Render big bold heading (centered)
    const heading = cfonts.render(title, {
      font: "tiny",
      align: "center",
      colors: ["cyan"],
    });

    // Build box content
    let content;
    if (isProjects) {
      content = items.map(item => {
        const name = `  ${chalk.white("•")}  ${chalk.bold(item.name)}`;
        const links = `     ${chalk.cyan("🌐")} ${terminalLink(chalk.cyan("Live"), item.live)}  ${chalk.gray("|")}  ${chalk.green("🐙")} ${terminalLink(chalk.green("GitHub"), item.github)}`;
        return name + "\n" + links;
      }).join("\n\n");
    } else {
      content = items.map(item => `  ${chalk.white("•")}  ${item}`).join("\n");
    }

    const box = boxen(content, {
      padding: 1,
      borderStyle: "round",
      borderColor: "#8FC47B",
    });

    // Print centered heading (cfonts handles centering)
    console.log(heading.string);

    // Center box on screen
    const boxLines = box.split("\n");
    const centeredBox = boxLines
      .map(line => {
        const visibleLength = stripAnsi(line).length;
        const boxPad = Math.max(0, Math.floor((width - visibleLength) / 2));
        return " ".repeat(boxPad) + line;
      })
      .join("\n");

    console.log(centeredBox);
  }

  if (DATA[cmd]) {
    printCenteredBox(cmd, DATA[cmd], cmd === "projects");
  } else if (cmd === "help") {
    const helpItems = Object.keys(DATA).map(key => chalk.green(key));
    helpItems.push(chalk.green("home"), chalk.green("help"), chalk.green("exit"));
    printCenteredBox("Help", helpItems);
  } else if (cmd === "home") {
    render();
  } else if (cmd === "exit") {
    rl.close();
    process.exit();
  } else {
    const errContent = chalk.red("Unknown command. Type 'help' for available commands.");
    const box = boxen(errContent, {
      padding: 1,
      borderStyle: "round",
      borderColor: "red",
    });
    const boxLines = box.split("\n");
    boxLines.forEach(line => {
      const visibleLength = stripAnsi(line).length;
      const padding = Math.max(0, Math.floor((width - visibleLength) / 2));
      console.log(" ".repeat(padding) + line);
    });
  }

  startInteractiveMode();
}

// ----------------------
// INIT
// ----------------------

render();
startInteractiveMode();

process.stdout.on("resize", () => {
  render();
});