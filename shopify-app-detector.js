function shopifyDetect() {
    document.querySelector('#shopifydetector .results.error').classList.add('d-none')
    document.querySelector('#shopifydetector .results.not-shopify').classList.add('d-none')
    document.querySelector('#shopifydetector .results.success').classList.add('d-none')
    document.querySelector('#shopifydetector .results.hire-expert').classList.add('d-none')
    var url = document.querySelector('[name="site-url"]').value.trim()
    var button = document.querySelector('[onclick="shopifyDetect()"]')
    var buttonText = button.innerHTML
    var url = document.querySelector('[name="site-url"]').value.trim()
    if ('' === url) return false;
    button.innerHTML = 'Please Wait'
    window.open(shopify_detector.popup_url, '_blank', 'resizable=yes, scrollbars=yes, titlebar=yes, width=389, height=778')

    const formData = new FormData();
    formData.append('url', url);

    fetch(shopify_detector.detection_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            button.innerHTML = buttonText
            res = JSON.parse(res)
            if (res.apps.length > 0) {
                appsHTML = ''
                for (var app of res.apps) {
                    appsHTML += `
                        <br>
                        <div class='results-name-container'>
                            <a target='_blank' href='${app.app_store_url}'> ${app.name}</a>
                            <p>${app.short_description}</p>
                        </div>
                    `
                }
                document.querySelector('#shopifydetector .results.success .resultMSG').innerHTML = `
                    ${res.url} is using:
                    ${appsHTML}
                `
                document.querySelector('#shopifydetector .results.success').classList.remove('d-none')
            } else {
                document.querySelector('#shopifydetector .results.not-shopify .resultMSG').innerHTML = `${res.url} not using Shopify`
                document.querySelector('#shopifydetector .results.not-shopify').classList.remove('d-none')
            }
            document.querySelector('#shopifydetector .results.hire-expert').classList.remove('d-none')

        })
        .catch(e => {
            document.querySelector('#shopifydetector .results.error .resultMSG').innerHTML = e
            document.querySelector('#shopifydetector .results.error').classList.remove('d-none')
        })
}


