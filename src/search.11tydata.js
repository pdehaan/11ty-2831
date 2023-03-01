module.exports = {
  pagination: {
    data: "stock",
    size: 1,
    alias: "vehicle",
    addAllPagesToCollections: true,
    before(data) {
      return data.reduce((vehicles, vehicle) => {
        for (const stock of vehicle.stock) {
          vehicles.push({
            brand: vehicle.brand,
            tags: vehicle.tags,
            ...stock,
          });
        }
        return vehicles;
      }, []);
    }
  },
  eleventyComputed: {
    permalink(data) {
      let { brand, range, model } = data.vehicle;
      // [brand, range, model] = [brand, range, model].map(f => this.slugify(f));
      brand = this.slugify(brand);
      range = this.slugify(range);
      model = this.slugify(model);
      return `/search/${ brand }/${ range }/${ model }/`;
    },
    tags(data) {
      const vehicleTags = data.vehicle?.tags || [];
      return ["search", ...vehicleTags];
    },
  }
};
