import { ListTypes, navigate2 } from './utils.js'

// get container by id
const container = document.querySelector('#card-container')

// for each button add event listener
ListTypes.forEach((listType) => {

    // create card
    const card = document.createElement('button')

    // configure card
    card.setAttribute('data-list-type', listType)
    card.textContent = listType

    card.addEventListener('click', function() {
        const listType = this.dataset.listType
        const listData = 'all'
        navigate2('list', { listType: listType, listData: listData })
    })

    // add to container
    container.appendChild(card)
})