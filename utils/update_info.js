const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);
const fs = require("fs");

const {
  baseUri,
  description,
  namePrefix,
  network,
  desoMetadata,
} = require(`${basePath}/src/config.js`);

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

data.forEach((item) => {
  if (network == NETWORK.deso) {
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.creators = desoMetadata.creators;
  } else {
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.image = `${baseUri}/${item.edition}.png`;
  }
  fs.writeFileSync(
    `${basePath}/build/json/${item.edition}.json`,
    JSON.stringify(item, null, 2)
  );
});

fs.writeFileSync(
  `${basePath}/build/json/_metadata.json`,
  JSON.stringify(data, null, 2)
);

if (network == NETWORK.deso) {
  console.log(`Updated description for images to ===> ${description}`);
  console.log(`Updated name prefix for images to ===> ${namePrefix}`);
  console.log(
    `Updated creators for images to ===> ${JSON.stringify(
      desoMetadata.creators
    )}`
  );
} else {
  console.log(`Updated baseUri for images to ===> ${baseUri}`);
  console.log(`Updated description for images to ===> ${description}`);
  console.log(`Updated name prefix for images to ===> ${namePrefix}`);
}
