export function navigate2(path, params) {

    const form  = document.createElement('form');
    form.method = 'GET';
    form.action = `${path}.html`;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const param = document.createElement('input');
            param.name  = key;
            param.value = params[key];
            form.appendChild(param);
        }
    }

    document.body.appendChild(form);
    form.submit();
}