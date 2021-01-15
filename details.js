import { key, ListTypes, fetch, Result, error } from './utils.js'

const urlParams = new URLSearchParams(window.location.search)
const listData  = urlParams.get('listType')
const id        = urlParams.get('id')

const listType  = key(urlParams.get('listType'))

if (ListTypes.hasOwnProperty(listType)) { // validate listType

    const value = ListTypes[listType]
    const path  = `${value.Value}/${id}`

    fetch(path, (result, data) => {
        switch (result) {
            case Result.Success:
                append(value.Details(data))
                break
            case Result.Failure:
                error(data)
                break
        }
    })

} else error('invalid listType parameter')

// appends child to container
function append(entity) {
    console.log(entity)
}