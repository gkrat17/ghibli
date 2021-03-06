import { key, ListTypes, Host, fetch, Result, error, navigate2, iterate, capitalize } from '../utils/utils.js'

const heading    = document.querySelector('.heading')
const dcontainer = document.querySelector('.dcontainer')
const acontainer = document.querySelector('.acontainer')
const urlParams  = new URLSearchParams(window.location.search)

const id = urlParams.get('id')
if (id != null) { // validate id
    const listType = key(urlParams.get('listType'))
    if (listType != null) { // validate listType

        const value = ListTypes[listType]
        const url   = `${Host}/${value.Value}/${id}`

        fetch(url, (result, data) => {
            switch (result) {
                case Result.Success:
                    display(value.Details(data))
                    break
                case Result.Failure:
                    error(data)
                    break
            }
        })
    } else error('invalid or not specified listType parameter')
} else error('id not specified')

// displays entity
function display(entity) {

    // set heading text
    heading.textContent = entity.title

    // display details
    iterate(entity.details, function(key, value) {
        const detail = document.createElement('div')
        const title = document.createElement('p')
        const description = document.createElement('p')

        dcontainer.appendChild(detail)

        detail.appendChild(title)
        detail.appendChild(description)

        title.textContent       = key
        description.textContent = value

        detail.setAttribute('class', 'detail')
        title.setAttribute('class', 'title')
        description.setAttribute('class', 'description')
    })

    // display associations
    iterate(entity.associations, function(key, ids) {
        const association = document.createElement('button')
        association.setAttribute('data-list-type', key)
        association.setAttribute('data-ids',       ids)

        const span = document.createElement('span')
        association.appendChild(span)
        span.textContent = capitalize(key)

        association.addEventListener('click', function() {
            const listType = this.dataset.listType
            const ids      = this.dataset.ids
            const listData = 'certain'
            navigate2('list', { listType: listType, listData: listData, ids: ids })
        })

        acontainer.appendChild(association)
    })
}