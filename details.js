import { key, ListTypes, fetch, Result, error } from './utils.js'

const urlParams = new URLSearchParams(window.location.search)

const id = urlParams.get('id')
if (id != null) { // validate id
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
} else error('id not specified')

// appends child to container
function append(entity) {
    console.log(entity)
}