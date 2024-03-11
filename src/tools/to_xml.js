import { input } from "@inquirer/prompts";

import _ from "lodash";
import Ableton from "ableton";
import fs from "fs";

export default async function () {
  console.log("ALS TO XML CONVERTER");

  const path = await input({
    message: "Locate .als project file (you can drag & drop it):",
  });

  const ableton = new Ableton(path.trim());

  ableton.read(function (error, $) {
    if (error) {
      console.error(error);
    } else {
      const data = $("ableton");

      // Export XML
      fs.writeFile("../export/project.xml", String(data), (err) => {
        if (err) throw err;
        console.log(
          "\x1b[31m",
          "\nExport successful in ./export/project.xml",
          "\x1b[0m"
        );
      });
    }
  });
}
