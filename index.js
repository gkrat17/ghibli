import { ListTypes, navigate2 } from './utils.js'

// get container by id
const container = document.querySelector('#container')

// for each element add event listener
for (const listType in ListTypes) {
    const value = ListTypes[listType].Value

    // create element
    const element = document.createElement('button')

    // configure element
    element.setAttribute('data-list-type', value)
    element.textContent = value

    element.addEventListener('click', function() {
        const listType = this.dataset.listType
        const listData = 'all'
        navigate2('list', { listType: listType, listData: listData })
        /*
        const listData = 'certain'
        const ids      = ['2baf70d1-42bb-4437-b551-e5fed5a87abe', '12cfb892-aac0-4c5b-94af-521852e46d6a']
        navigate2('list', { listType: listType, listData: listData, ids: ids })
        */
    })

    // add elem to container
    container.appendChild(element)
}