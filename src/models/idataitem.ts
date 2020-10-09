/**
 * interface : IDataItem
 * Autor : FGG
 * Fecha : 08/10/2020
 *
 * metadata estructura de los items de los datos dashboard
 */

export default interface IDataItem {
    "index": number,
    "index_start_at": number,
    "integer": number,
    "float": number,
    "name": string,
    "surname": string,
    "fullname": string,
    "email": string,
    "bool": boolean
}
