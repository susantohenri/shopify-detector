function shopifyDetect() {
    document.querySelector('#shopifydetector .results.error').classList.add('d-none')
    document.querySelector('#shopifydetector .results.not-shopify').classList.add('d-none')
    document.querySelector('#shopifydetector .results.success').classList.add('d-none')
    var url = document.querySelector('[name="site-url"]').value.trim()
    if ('' === url) return false;

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
            res = JSON.parse(res)
            if ('' !== res.theme && null !== res.theme) {
                document.querySelector('#shopifydetector .results.success .resultMSG').innerHTML = `
                    ${res.url} is built using
                    <br>
                    <div class='results-name-container'>
                        <a target='_blank' href='https://themes.shopify.com'> ${res.theme.name}</a>
                    </div> <br>
                    <a target='_blank' href='https://themes.shopify.com' class='btn btn-info btn-more-info'>
                        Get This Theme
                    </a>
                    <div>
                        <small>* Click the button and enter your email</small>
                    </div>
                `
                document.querySelector('#shopifydetector .results.success').classList.remove('d-none')
            } else {
                document.querySelector('#shopifydetector .results.not-shopify .resultMSG').innerHTML = `${res.url} not using Shopify`
                document.querySelector('#shopifydetector .results.not-shopify').classList.remove('d-none')
            }
        })
        .catch(e => {
            document.querySelector('#shopifydetector .results.error .resultMSG').innerHTML = e
            document.querySelector('#shopifydetector .results.error').classList.remove('d-none')
        })
}


