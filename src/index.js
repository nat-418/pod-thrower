import data         from "./data.js";
import fs           from "fs";
import templateAtom from "./templates/atom.js";
import templateHTML from "./templates/html.js";

const atom = templateAtom(data);
const html = templateHTML(data);

fs.writeFile("./www/rss/feed.xml", atom, err => {
  if (err) {
    console.error(err);
    return false;
  }

  return true;
});

fs.writeFile("./www/index.html", html, err => {
  if (err) {
    console.error(err);
    return false;
  }

  return true;
});
