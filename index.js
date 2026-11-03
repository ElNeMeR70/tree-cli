#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const root = process.argv[2] || ".";
const maxDepth = parseInt(process.argv[3], 10) || 3;
const IGNORE = new Set(["node_modules", ".git", ".next", "dist", "build", ".cache"]);

function render(dir, prefix = "", depth = 0) {
  if (depth > maxDepth) return;
  try {
    const list = fs.readdirSync(dir, { withFileTypes: true }).filter(f => !IGNORE.has(f.name));
    list.forEach((item, idx) => {
      const isLast = idx === list.length - 1;
      const pointer = isLast ? "└── " : "├── ";
      console.log(`${prefix}${pointer}${item.isDirectory() ? "\x1b[34m" + item.name + "/\x1b[0m" : item.name}`);
      if (item.isDirectory()) {
        render(path.join(dir, item.name), prefix + (isLast ? "    " : "│   "), depth + 1);
      }
    });
  } catch {}
}
console.log(`\x1b[36mDirectory Tree for: ${path.resolve(root)}\x1b[0m`);
render(root);
