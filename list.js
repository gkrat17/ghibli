import { fetch } from './utils.js'

const urlParams = new URLSearchParams(window.location.search)
const listType  = urlParams.get('listType')

// validate listType
if (['films', 'people', 'locations', 'species', 'venicles'].includes(listType)) {

    const listData = urlParams.get('listData')

    switch (listData) {

        case 'all':
            fetch(listType, function(result) {
                if (result.hasOwnProperty('success')) {
                    const list = result.success
                    console.log('success', list[0].title)
                } else /* 'failure' */ {
                    const message = result.failure
                    console.log('failure', message)
                }
            })
            break

        case 'ids':
            // TODO: handle 'ids' case
            break

        default:
            // error: invalid listData parameter
            break
    }

} else {
    // error: invalid listType parameter
}