import { showLogo } from "./logo.js";
showLogo();

import { input } from "@inquirer/prompts";
import { select } from "@inquirer/prompts";

// Import Tools
import LocatorsMagicQSMPTE from "./tools/magicq_locators.js";

const tool = await select({
  message: "Select a tools",
  choices: [
    {
      name: "Export Ableton Locators as Chamsys MagicQ CueStack (SMPTE 30)",
      value: "magicq_locators",
      description:
        "Export Ableton Locators to Parsed .CSV file for Chamsys MagicQ",
    },
  ],
});

switch (tool) {
  case "magicq_locators":
    LocatorsMagicQSMPTE();
    break;
}
