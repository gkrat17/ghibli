export function navigate2(path, params) {

    const form  = document.createElement('form');
    form.method = 'GET';
    form.action = `${path}.html`;

    for (const [key, value] of Object.entries(params)) {
        const param = document.createElement('input');
        param.type  = 'hidden';
        param.name  = key;
        param.value = value;
        form.appendChild(param);
    }

    document.body.appendChild(form);
    form.submit();
}