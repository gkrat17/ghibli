// list types
export const ListTypes = {

    Films: {
        Value: 'films',
        Desc: function(entity) {
            return { id: entity.id }
        }
    },

    People: {
        Value: 'people',
        Desc: function(entity) {
            return { id: entity.id }
        }
    },

    Locations: {
        Value: 'locations',
        Desc: function(entity) {
            return { id: entity.id }
        }
    },

    Species: {
        Value: 'species',
        Desc: function(entity) {
            return { id: entity.id }
        }
    },

    Vehicles: {
        Value: 'vehicles',
        Desc: function(entity) {
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
