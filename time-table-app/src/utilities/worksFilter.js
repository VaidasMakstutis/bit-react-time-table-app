const worksFilter = (criteria, data) => {
    const filteredItems = data.filter(item => {
      return Object.keys(criteria).every(filter => {
        return criteria[filter] === item[filter];
      });
    });
    return filteredItems;
  };

  export default worksFilter;