import { key, ListTypes, fetch, Result, error } from './utils.js'

const urlParams = new URLSearchParams(window.location.search)
const listType  = key(urlParams.get('listType'))

if (ListTypes.hasOwnProperty(listType)) { // validate listType

    const value    = ListTypes[listType]
    const listData = urlParams.get('listData')

    switch (listData) {

        case 'all':
            fetch(value.Value, (result, data) => {
                switch (result) {
                    case Result.Success:
                        data.map(value.Desc).forEach(entity => { append(entity) })
                        break
                    case Result.Failure:
                        error(data)
                        break
                }
            })
            break

        case 'ids':
            // TODO: handle 'ids' case
            break

        default:
            error('invalid listData parameter')
    }
} else error('invalid listType parameter')

// appends child to container list
function append(entity) {
    console.log(entity)
}