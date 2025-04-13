module.exports = {
  siteUrl: "https://www.cvinminute.com",
  generateRobotsTxt: true, // Generates robots.txt automatically
  exclude: ["/admin", "/account", "/protected", "/api/*"],
  changefreq: "daily",
  priority: 0.7,
  transform: async (config, path) => {
    // Customize priority for important pages
    if (path === "/") {
      return { loc: path, changefreq: "daily", priority: 1 };
    }
    if (path.startsWith("/pricing")) {
      return { loc: path, changefreq: "weekly", priority: 0.9 };
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
    };
  },
  //   additionalPaths: async (config) => {
  //     // Add dynamic paths from API
  //     const posts = await fetchPosts();
  //     return posts.map((post) => ({
  //       loc: `/blog/${post.slug}`,
  //       lastmod: new Date(post.updatedAt).toISOString(),
  //     }));
  //   },
};
