const objectFilter = (obj, search) => {
  /**
   * Matches keys, strings, numbers, null, boolean, and references.
   * @param key
   *  Used to match dictionary keys. Use an empty string to omit.
   * @param value
   *  The value being searched.
   * @param search
   *  The search term.
   * @returns {boolean}
   */
  const findInCommonPrimitives = (key = "", value, search) => {
    const regex = new RegExp(search, "i");

    return !!(
      key.match(regex) || // The key matches, so keep it all
      value === search || // The value has strict equality to the search
      (typeof value === "string" && value.match(regex)) // Search string is in value (case-insensitive)
    );
  };

  /**
   * Filter nested objects.
   * @param subject
   * @param search
   * @returns {*}
   *  Object with items matching search term or false.
   */
  const findInObject = (subject, search) => {
    const found = objectFilter(subject, search);

    return Object.keys(found).length ? found : false;
  };

  /**
   * Filter potentially nested arrays.
   * @param subject
   * @param search
   * @param cb
   *  A callback to getMatchingItems() to manage circular-dependency.
   * @returns {*}
   *  An array with filtered results or false.
   */
  const findInArray = (subject, search, cb) => {
    const reduced = subject.reduce((prev, current) => {
      const found = cb("", current, search);

      if (found) {
        prev.push(found);
      }

      return prev;
    }, []);

    return reduced.length ? reduced : false;
  };

  /**
   * Orchestrate the gathering of filtered data from various
   * data types and structures.
   * @param key
   * @param subject
   * @param search
   * @returns {*}
   */
  const getMatchingItems = (key, subject, search) => {
    const type = Object.prototype.toString.call(subject);

    if (findInCommonPrimitives(key, subject, search)) {
      return subject;
    } else if (type === "[object Object]") {
      return findInObject(subject, search);
    } else if (type === "[object Array]") {
      return findInArray(subject, search, getMatchingItems);
    }
  };

  /**
   * Generate a result set.
   * @param subject
   * @returns {{}}
   */
  const getFilteredObject = subject =>
    Object.keys(subject).reduce((prev, current) => {
      const found = getMatchingItems(current, obj[current], search);
      if (found) {
        prev[current] = found;
      }

      return prev;
    }, {});

  // Immediately generate the result set.
  return getFilteredObject(obj)
};

export default objectFilter;
