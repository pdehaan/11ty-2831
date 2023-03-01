const stock = require("./src/_data/stock.json");

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 * @returns {ReturnType<import("@11ty/eleventy/src/defaultConfig")>}
 */
module.exports = function (eleventyConfig) {

  const stockTags = stock.reduce((tags, vehicle) => {
    vehicle.tags?.forEach(tag => tags.add(tag));
    return tags;
  }, new Set());

  stockTags.forEach(tag => {
    eleventyConfig.addCollection(tag, collectionApi => {
      return collectionApi.getFilteredByTags("search", tag);
    });
  });

  eleventyConfig.addFilter("keys", (obj = {}) => Object.keys(obj).sort());

  return {
    dir: {
      input: "src",
      output: "www",
    }
  };
};
