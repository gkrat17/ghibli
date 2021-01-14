import { ListTypes, fetch, Result, error } from './utils.js'

const urlParams = new URLSearchParams(window.location.search)
const listType  = urlParams.get('listType')

if (Object.values(ListTypes).includes(listType)) { // validate listType
    const listData = urlParams.get('listData')
    switch (listData) {

        case 'all':
            fetch(listType, (result, data) => {
                switch (result) {
                    case Result.Success:
                        data.map(entity).forEach(entity => { append(entity) })
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

// converts data entity to list entity
function entity(data) {
    return { id: data.id, type: listType }
}

// appends child to container list
function append(entity) {
    console.log(entity)
}