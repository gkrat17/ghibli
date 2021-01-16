import { key, ListTypes, capitalize, Host, fetch, Result, error, navigate2, iterate, truncate } from '../utils/utils.js'

const container = document.querySelector('.container')
const title     = document.querySelector('.heading')
const urlParams = new URLSearchParams(window.location.search)
const listType  = key(urlParams.get('listType'))

if (listType != null) { // validate listType

    const value    = ListTypes[listType]
    const listData = urlParams.get('listData')

    title.textContent = `List of ${capitalize(value.Value)}!`

    switch (listData) {

        case 'all':
            const url = `${Host}/${value.Value}`
            fetch(url, (result, data) => {
                switch (result) {
                    case Result.Success:
                        if (data.length == 1) {
                            const id = value.Description(data[0]).id
                            navigate2('details', { listType: value.Value, id: id })
                        } else data.map(value.Description).forEach(entity => { append(entity) })
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
                error('ids not specified')
                break
            }
            ids = ids.split(',')
            if (ids.length == 1) {
                navigate2('details', { listType: value.Value, id: ids[0]})
                break
            } 
            ids.forEach(id => {
                const url = `${Host}/${value.Value}/${id}`
                fetch(url, (result, data) => {
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
            error('invalid or not specified listData parameter')
    }
} else error('invalid or not specified listType parameter')

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

    const title = document.createElement('p')
    title.setAttribute('class', 'title')
    title.textContent = entity.title
    element.appendChild(title)

    const dcontainer = document.createElement('div')
    dcontainer.setAttribute('class', 'dcontainer')
    element.appendChild(dcontainer)

    iterate(entity.description, function(key, value) {

        const keyElement = document.createElement('p')
        keyElement.setAttribute('class', 'key')
        keyElement.textContent = `${key}:`
        dcontainer.appendChild(keyElement)

        const valueElement = document.createElement('p')
        valueElement.setAttribute('class', 'value')
        valueElement.textContent = truncate(value)
        dcontainer.appendChild(valueElement)
    })
}