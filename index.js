import { ListTypes, navigate2 } from './utils.js'

// get container by id
const container = document.querySelector('#container')

// for each element add event listener
for (const listType in ListTypes) {
    const value = ListTypes[listType]

    // create element
    const element = document.createElement('button')

    // configure element
    element.setAttribute('data-list-type', value)
    element.textContent = value

    element.addEventListener('click', function() {
        const listType = this.dataset.listType
        const listData = 'all'
        navigate2('list', { listType: listType, listData: listData })
    })

    // add elem to container
    container.appendChild(element)
}