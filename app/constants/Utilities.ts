import moment from 'moment'

export const ROLES = [
    { id: "admin", label: "Administrador" },
    { id: "user", label: "Multiplicador" }
]

/**
 * Retrieves the label associated with a given role.
 * @param {String} rol - The role identifier ('admin' or 'user').
 * @returns {String} - The corresponding role label.
 */
export const getRole = (rol: String) => {
    if (rol === 'admin') return ROLES[0].label
    if (rol === 'user') return ROLES[1].label
}

/**
 * Formats a given date string according to the specified format using the moment library.
 * @param {string} date - The date string to be formatted.
 * @param {string} format - The desired format for the output (default is "DD/MM/YYYY").
 * @returns {string} - The formatted date string.
 */
export const viewDate = (date = "", format = "DD/MM/YYYY") => {
    return moment(date.toString()).format(format)
}

/**
 * Formats an identification card number by inserting hyphens at specific positions.
 * @param {string} idCard - The identification card number to be formatted.
 * @returns {string} - The formatted identification card number.
 */
export const identificationCard = (idCard: string) => {
    const parts = [
        idCard.slice(0, 3),
        idCard.slice(3, 10),
        idCard.slice(10, 11)
    ]
    return parts.join("-")
}

/**
 * Sums the 'count' property in the given list of objects.
 * 
 * @param list - An array of objects with a 'count' property.
 * @returns The total sum of 'count' values.
 */
export const sumCount = (list: any) => {
    const resp: any = list.reduce((a: any, c: any) => a + c.count, 0)
    return numFormat(resp)
}

/**
 * Formats a number using the Intl.NumberFormat with the "en-IN" locale.
 * 
 * @param n - The number to be formatted.
 * @returns A formatted string representing the given number.
 */
export const numFormat = (n: number) => {
    return new Intl.NumberFormat("en-IN").format(n)
}