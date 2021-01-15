import { key, ListTypes, Host, fetch, Result, error } from './utils.js'

const urlParams = new URLSearchParams(window.location.search)

const id = urlParams.get('id')
if (id != null) { // validate id
    const listType = key(urlParams.get('listType'))
    if (listType != null) { // validate listType

        const value = ListTypes[listType]
        const url   = `${Host}/${value.Value}/${id}`

        fetch(url, (result, data) => {
            switch (result) {
                case Result.Success:
                    append(value.Details(data))
                    break
                case Result.Failure:
                    error(data)
                    break
            }
        })

    } else error('invalid or not specified listType parameter')
} else error('id not specified')

// appends child to container
function append(entity) {
    console.log(entity)
}