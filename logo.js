export function showLogo() {
  const logo = `\r\n           _     _      _                _______          _     \r\n     \/\\   | |   | |    | |              |__   __|        | |    \r\n    \/  \\  | |__ | | ___| |_ ___  _ __      | | ___   ___ | |___ \r\n   \/ \/\\ \\ | \'_ \\| |\/ _ \\ __\/ _ \\| \'_ \\     | |\/ _ \\ \/ _ \\| \/ __|\r\n  \/ ____ \\| |_) | |  __\/ || (_) | | | |    | | (_) | (_) | \\__ \\\r\n \/_\/    \\_\\_.__\/|_|\\___|\\__\\___\/|_| |_|    |_|\\___\/ \\___\/|_|___\/\r\n                                                                \r\n                                                                \r\n`;

  const info = {
    author: "paintedfriend",
    version: "1.0",
  };
  console.log("\x1b[35m", logo);
  console.log("author: ", info.author);
  console.log("version: ", info.version);
  console.log("\x1b[0m", "\n");
}
