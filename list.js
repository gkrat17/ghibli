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
                        data.map(value.Description).forEach(entity => { append(entity) })
                        break
                    case Result.Failure:
                        error(data)
                        break
                }
            })
            break

        case 'certain':
            var ids = urlParams.get('ids')
            if (ids == null) {
                error('ids not passed')
                break
            }
            ids = ids.split(',')
            ids.forEach(id => {
                const path = `${value.Value}/${id}`
                fetch(path, (result, data) => {
                    switch (result) {
                        case Result.Success:
                            append(value.Description(data))
                            break
                        case Result.Failure:
                            error(data)
                            break
                    }
                })
            })
            break

        default:
            error('invalid listData parameter')
    }
} else error('invalid listType parameter')

// appends child to container list
function append(entity) {
    console.log(entity) // TODO: append to container
}