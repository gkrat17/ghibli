// list types
export const ListTypes = ['films', 'people', 'locations', 'species', 'vehicles']

// navigates to page specified by path variable
// for example - 'list', 'description'
export function navigate2(path, params) {

    const form  = document.createElement('form')
    form.method = 'GET'
    form.action = `${path}.html`

    for (const [key, value] of Object.entries(params)) {
        const param = document.createElement('input')
        param.type  = 'hidden'
        param.name  = key
        param.value = value
        form.appendChild(param)
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
    console.log('Failure', data)
}