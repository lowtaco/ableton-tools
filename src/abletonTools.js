import { showLogo } from "./logo.js";
showLogo();

import { select } from "@inquirer/prompts";

// Import Tools
import LocatorsMagicQSMPTE from "./tools/magicq_locators.js";
import ExportToXML from "./tools/to_xml.js";

const tool = await select({
  message: "Select a tool",
  choices: [
    {
      name: "Export Ableton Project as .XML file",
      value: "to_xml",
    },
    {
      name: "Export Ableton Locators as Chamsys MagicQ CueStack (SMPTE 30)",
      value: "magicq_locators",
    },
  ],
});

switch (tool) {
  case "magicq_locators":
    LocatorsMagicQSMPTE();
    break;
  case "to_xml":
    ExportToXML();
    break;
}
