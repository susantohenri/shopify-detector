document.querySelector('.detect-site').addEventListener('click', () => {
    var url = document.querySelector('[name="site-url"]').value
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
        if ('' !== res.error) shopifyDetectorShowError(res.error)
        else console.log(res)
    })
    .catch(e => {
        shopifyDetectorShowError(e)
    })
})

function shopifyDetectorShowError(e) {
    document.querySelector('.detect-alert').innerHTML = `ERROR: ${e}`
    document.querySelector('.detect-alert').removeAttribute('hidden')
}