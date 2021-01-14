import { ListTypes, fetch, Result } from './utils.js'

const urlParams = new URLSearchParams(window.location.search)
const listType  = urlParams.get('listType')

// validate listType
if (ListTypes.includes(listType)) {

    const listData = urlParams.get('listData')
    switch (listData) {

        case 'all':
            fetch(listType, function(result, data) {
                switch (result) {
                    case Result.Success:
                        console.log('Success', data)
                        break
                    case Result.Failure:
                        console.log('Failure', data)
                        break
                }
            })
            break

        case 'ids':
            // TODO: handle 'ids' case
            break

        default:
            // error: invalid listData parameter
            break // DELETE
    }

} else {
    // error: invalid listType parameter
}