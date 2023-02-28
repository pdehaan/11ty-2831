module.exports = {
  pagination: {
    data: "stock",
    size: 1,
    alias: "vehicle",
    before(data) {
      return data.reduce((vehicles, vehicle) => {
        for (const stock of vehicle.stock) {
          vehicles.push({ brand: vehicle.brand, ...stock });
        }
        return vehicles;
      }, []);
    }
  },
  permalink(data) {
    let { brand, range, model } = data.vehicle;
    brand = this.slugify(brand);
    range = this.slugify(range);
    model = this.slugify(model);
    return `/search/${ brand }/${ range }/${ model }/`;
  }
};
