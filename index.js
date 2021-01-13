import { navigate2 } from './utils.js';

const buttons = document.querySelectorAll('#buttons > *')

// for each button add event listener
buttons.forEach(button =>
    button.addEventListener('click', function() {
        const listType = this.dataset.listType
        const listData = 'all'
        navigate2('list', {'listType': listType, 'listData': listData})
    })
);