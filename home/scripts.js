import { ListTypes, navigate2 } from '../utils/utils.js'

const container = document.querySelector('#container')

for (const listType in ListTypes) {
    const value = ListTypes[listType].Value

    const element = document.createElement('button')

    element.setAttribute('data-list-type', value)
    element.textContent = value.charAt(0).toUpperCase() + value.slice(1)

    element.addEventListener('click', function() {
        const listType = this.dataset.listType
        const listData = 'all'
        navigate2('list', { listType: listType, listData: listData })
    })

    container.appendChild(element)
}