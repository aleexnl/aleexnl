import { database } from "lib/firebase";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * A Model that represents a contact.
 * @typedef {Object} Contact
 * @property {String} name Name of the contact
 * @property {String} email Email of the contact
 * @property {String} message Message of the contact
 */

/**
 * API endpoint handler
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            const contacts = getContacts();
            res.send(contacts);
            break;
        case "POST":
        case "PUT":
            const isCreated = setContact(JSON.parse(req.body));
            res.send({ created: isCreated });
            break;
        default:
            res.send([]);
            break;
    }
}

/**
 * Function used to retrive all contacts from database.
 * @returns {Contact[]}
 */
const getContacts = () => {
    const users = [];
    const usersRef = database.ref("users/");
    usersRef.on(
        "value",
        (snapshot) => {
            users.push(snapshot.val());
        },
        (errorObject) => {
            console.log("The read failed: " + errorObject);
        }
    );
    return users;
};

/**
 * Function used to create a contact in database.
 * @param {Object} contact The contact body
 * @param {String} contact.name The contact body
 * @param {String} contact.email The contact body
 * @param {String} contact.message The contact body
 * @returns {Boolean} If the contact was created or not
 */
const setContact = ({ name, email, message }) => {
    const id = +new Date();
    const usersRef = database.ref("users/" + id);
    usersRef.set({
        name,
        email,
        message,
    });
    return true;
};
