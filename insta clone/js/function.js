// Alert Function
const setAlert = (msg, type = "danger") => `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button data-bs-dismiss="alert" class="btn-close"></button></p>`;

/**
 * Get all local storage data
 * @param {*} key 
 * @returns {*} the parsed value from local storage or false
 */
const getLSData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : false;
};

// Set Value LS
const createLSData = (key, value) => {
    const data = getLSData(key) || [];
    data.push(value);
    localStorage.setItem(key, JSON.stringify(data));
};

// Update LS Data
const updateLSData = (key, array) => {
    localStorage.setItem(key, JSON.stringify(array));
};
