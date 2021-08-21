/**
 * Function used to call API request.
 * @param {String} path API endpoint you want to fetch
 * @param {String} method Methodd of the HTTP Request
 * @param {String} body JSON body of the HTTP Request
 * @returns {(Response|Boolean)}The response of the API or a false
 */
export const makeApiRequest = async (path, method = "GET", body = {}) => {
    const response = await fetch("/api/" + path, {
        method: method,
        body: body,
    });
    return response;
};
