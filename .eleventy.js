module.exports = function(eleventyConfig) {
  // Add date filter
  eleventyConfig.addFilter("date", function(date) {
    return new Date(date).getFullYear();
  });

  // Ignore README files from processing
  eleventyConfig.ignores.add("README.md");

  // Set input and output directories
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("privacy-policy.txt");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("security.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("sw.js");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};