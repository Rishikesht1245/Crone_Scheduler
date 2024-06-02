export const getLocalData = (key, type = "string") => {
  try {
    let data = localStorage.getItem(key);
    if (type === "object") {
      data = JSON.parse(data);
    }
    return data;
  } catch (error) {
    console.log("Error in fetching data from local storage");
  }
};

export const storeLocally = (key, type = "string", data) => {
  try {
    let dataToStore = data;
    if (type === "object") {
      dataToStore = JSON.stringify(data);
    }
    localStorage.setItem(key, dataToStore);
  } catch (error) {
    console.log("Error in writing to local storage");
  }
};

export const removeLocalData = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.log("Error in clearing local data");
  }
};
