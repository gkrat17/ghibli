import { key, ListTypes, fetch, Result, error, navigate2 } from './utils.js'

const container = document.querySelector('#container')
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
            const ids = urlParams.get('ids')
            if (ids == null) {
                error('ids not passed')
                break
            }
            ids.split(',').forEach(id => {
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

// appends child to container
function append(entity) {

    const element = document.createElement('div')
    element.setAttribute('data-id', entity.id)
    element.addEventListener('click', function() {
        const id            = this.dataset.id
        const listTypeValue = ListTypes[listType].Value
        navigate2('details', { listType: listTypeValue, id: id })
    })
    container.appendChild(element)

    const title = document.createElement('h1')
    title.textContent = entity.title
    element.appendChild(title);

    for (const [key, value] of Object.entries(entity.description)) {
        if (entity.description.hasOwnProperty(key)) {
            const description = document.createElement('h4')
            description.textContent = `${key}: ${value}`
            element.appendChild(description)
        }
    }
}