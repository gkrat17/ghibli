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

export function fetch(path, completion) {
    const request = new XMLHttpRequest()
    request.open('GET', `https://ghibliapi.herokuapp.com/${path}`, true)
    request.onload = function () {
        const response = JSON.parse(this.response)
        if (request.status == 200)
            completion({ success: response })
        else completion({ failure: 'error' })
    }
    request.send()
}