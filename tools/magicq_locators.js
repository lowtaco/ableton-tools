import { input } from "@inquirer/prompts";
import { select } from "@inquirer/prompts";

import _ from "lodash";
import Ableton from "ableton";
import SMPTE from "smpte.js";
import fs from "fs";

const FPS = 30;

export default async function () {
  console.log("MAGICQ CUE STACK FROM LOCATORS PARSER (SMPTE 30)");

  const path = await input({
    message: "Locate .als project file (you can drag & drop it):",
  });

  const ableton = new Ableton(path.trim());

  ableton.read(function (error, $) {
    if (error) {
      console.error(error);
    } else {
      // Parse XML .ALS Ableton Project Data
      const bpm = $("tempo").children("lomid").children("manual").attr("value");
      const locatorsTag = $("locators").children("locator");

      // Mapping locators data
      const locators = mapLocators(locatorsTag, bpm);
      const locatorsTable = locatorsToTable(locators);

      console.log("Target SMPTE FPS: ", FPS);
      console.log("Project BPM: ", +bpm);
      console.log("Count of Project Locators: ", locators.length);
      console.log("Preview Locators Table:\n", locatorsTable);

      // Export CSV
      exportLocatorsTable(locatorsTable);
    }
  });

  function exportLocatorsTable(table) {
    fs.writeFile("./export/MagicQ_CueStack_Locators.csv", table, (err) => {
      if (err) throw err;
      console.log(
        "\x1b[31m",
        "\nExport successful in ./export/MagicQ_CueStack_Locators.csv",
        "\x1b[0m"
      );
    });
  }

  function locatorsToTable(locators) {
    const header_row = "#,Name,Start";
    let table = header_row;

    _.forEach(locators, (locator) => {
      const row = String(locator.id) + "," + locator.name + "," + locator.smpte;
      table += "\n" + row;
    });

    return table;
  }

  function encodeSMPTE(time, bpm) {
    // Get duration of one beat
    const once = 60 / bpm; // длительность одного удара

    // Create Timecode from seconds
    const seconds = time * once;
    const timecode = SMPTE.fromSeconds(seconds, FPS, false).toString();
    return timecode;
  }

  function mapLocators(locatorsData, bpm) {
    let locators = [];

    _.forEach(locatorsData, (locator) => {
      // Get TIME & NAME PARENT TAG
      const lomidTag = _.find(locator.children, { name: "lomid" });

      // Get TIME
      const timeTag = _.find(lomidTag.children, { name: "time" });
      const time = timeTag.attribs.value;

      // Get NAME
      const nameTag = _.find(timeTag.children, { name: "name" });
      const name = nameTag.attribs.value;

      // Get SMPTE
      const timecode = encodeSMPTE(time, bpm);

      let mapped = {
        name: name,
        time: +time,
        smpte: timecode,
      };

      locators.push(mapped);
    });

    locators = _.sortBy(locators, "time");

    _.forEach(locators, (locator, index) => {
      locator.id = index;
    });

    return locators;
  }
}
