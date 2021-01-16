import { key, ListTypes, Host, fetch, Result, error, navigate2, iterate } from '../utils/utils.js'

const container = document.querySelector('.container')
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

    const element = document.createElement('div')
    container.appendChild(element)

    const title = document.createElement('h1')
    title.textContent = entity.title
    element.appendChild(title);

    iterate(entity.details, function(key, value) {
        const detail = document.createElement('h4')
        detail.textContent = `${key}: ${value}`
        element.appendChild(detail)
    })

    iterate(entity.associations, function(key, ids) {
        const association = document.createElement('button')

        association.setAttribute('data-list-type', key)
        association.setAttribute('data-ids',       ids)

        association.textContent = `Associated ${key}`

        association.addEventListener('click', function() {
            const listType = this.dataset.listType
            const ids      = this.dataset.ids
            const listData = 'certain'
            navigate2('list', { listType: listType, listData: listData, ids: ids })
        })

        container.appendChild(association)
    })
}