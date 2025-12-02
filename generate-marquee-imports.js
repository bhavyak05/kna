// generate-marquee-imports.js

const fs = require("fs");
const path = require("path");

// Path to folder where your marquee images are stored (public/marquee)
const dir = path.join(__dirname, "public", "marquee");

// Path where marquee-images.ts should be created
const out = path.join(__dirname, "src", "components", "marquee-images.ts");

const files = fs
  .readdirSync(dir)
  .filter((f) => /\.(png|jpe?g|webp|svg)$/i.test(f));

let output = `// AUTO-GENERATED FILE — DO NOT EDIT MANUALLY\n\n`;

files.forEach((file, index) => {
  const varName = `img_${index}`;
  output += `import ${varName} from "@/public/marquee/${file}";\n`;
});

output += `\nexport const marqueeImages = [\n`;
files.forEach((_, index) => {
  output += `  img_${index},\n`;
});
output += `];\n`;

fs.writeFileSync(out, output);

console.log(`✔ Generated marquee-images.ts with ${files.length} images.`);
