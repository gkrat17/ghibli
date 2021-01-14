/**
 * ListTypes enum
 * each case contains:
 * 1. its *unique* string value (also used as PATH)
 * 2. entity to Description converter function
 * 3. entity to Details converter function
 */
export const ListTypes = {

    /* case Films */
    Films: {
        Value: 'films',
        Description: function(entity) {
            return { id: entity.id }
        },
        Details: function(entity) {
            return { id: entity.id }
        }
    },

    /* case People */
    People: {
        Value: 'people',
        Description: function(entity) {
            return { id: entity.id }
        },
        Details: function(entity) {
            return { id: entity.id }
        }
    },

    /* case Locations */
    Locations: {
        Value: 'locations',
        Description: function(entity) {
            return { id: entity.id }
        },
        Details: function(entity) {
            return { id: entity.id }
        }
    },

    /* case Species */
    Species: {
        Value: 'species',
        Description: function(entity) {
            return { id: entity.id }
        },
        Details: function(entity) {
            return { id: entity.id }
        }
    },

    /* case Vehicles */
    Vehicles: {
        Value: 'vehicles',
        Description: function(entity) {
            return { id: entity.id }
        },
        Details: function(entity) {
            return { id: entity.id }
        }
    }
}

// returns key of ListTypes by its value
export function key(value) {
    return Object.keys(ListTypes).find(key => ListTypes[key].Value === value)
}

// navigates to page specified by path variable
// for example - 'list', 'description'
export function navigate2(path, params) {

    const form  = document.createElement('form')
    form.method = 'GET'
    form.action = `${path}.html`

    for (const [key, value] of Object.entries(params)) {
        if (params.hasOwnProperty(key)) {
            const param = document.createElement('input')
            param.type  = 'hidden'
            param.name  = key
            param.value = value
            form.appendChild(param)
        }
    }

    document.body.appendChild(form)
    form.submit()
}

// success / failure enum
export const Result = {
    Success: 'Success',
    Failure: 'Failure'
}

// server host url
export const Host = 'https://ghibliapi.herokuapp.com'

// fetchs data from server
export function fetch(path, completion) {
    const request = new XMLHttpRequest()
    request.open('GET', `${Host}/${path}`, true)
    request.onload = function() {
        const response = JSON.parse(this.response)
        if (request.status == 200)
            completion(Result.Success, response)
        else completion(Result.Failure, 'Error Message')
    }
    request.send()
}

// error handler
export function error(message) {
    console.log('Failure', message)
}
