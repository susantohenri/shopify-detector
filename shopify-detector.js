function shopifyDetect() {
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
            if ('' !== res.error) shopifyDetectorShowError(res.error)
            else {
                document.querySelector('.detect-alert').setAttribute('hidden', true)
                document.querySelector('.theme-detected').innerHTML = `<div class="sub-caption">Nothing found</div>`
                if ('' !== res.theme && null !== res.theme) {
                    if (res.theme.theme_store_id) {
                        document.querySelector('.theme-detected').innerHTML = `
                                <div class="content">
                                    <div>
                                        <div class="columns-row">
                                            <div class="column size-1 size-md-12">
                                                <div class="img-holder">
                                                    <a rel="noreferrer nofollow" target="_blank" href="https://themes.shopify.com"><img
                                                            src="${shopify_detector.shopify_logo}?width=70&amp;height=70" style="width:70px;height:70px;"> </a>
                                                </div>
                                            </div>
                                            <div class="column size-11 size-md-12 detected-title">
                                                <a rel="noreferrer nofollow" target="_blank" class="link colored detected-title-h2 heading-caption s-4"
                                                href="https://themes.shopify.com">${res.theme.name}</a>
                                            </div>
                                        </div>
                                    </div><br>
                                    <div>
                                        <a class="bt s-2 transparent mt-3" rel="noreferrer nofollow" target="_blank"
                                            href="https://themes.shopify.com">More Info</a>
                                    </div>
                                </div>
                            `
                    }
                }

                for (var appactv of document.querySelectorAll('.apps-detected-active')) appactv.remove()
                for (var app of res.apps) {
                    var appHTML = document.querySelector('.apps-detected-template').cloneNode(true)
                    appHTML.querySelector(".detected-title-h2").href = app.app_store_url
                    appHTML.querySelector(".detected-title-h2").textContent = app.name
                    appHTML.querySelector(".app-long-description").textContent = app.short_description
                    appHTML.querySelector(".app-more-info").href = app.app_store_url
                    appHTML.removeAttribute('hidden')
                    appHTML.classList.remove('apps-detected-template')
                    appHTML.classList.add('apps-detected-active')
                    document.querySelector('.apps-detected').appendChild(appHTML)
                }
                document.querySelector('.detecting-result-wrapper').removeAttribute('hidden')
            }
        })
        .catch(e => {
            shopifyDetectorShowError(e)
        })
}

function shopifyDetectorShowError(e) {
    document.querySelector('.detect-alert').innerHTML = `ERROR: ${e}`
    document.querySelector('.detect-alert').removeAttribute('hidden')
    document.querySelector('.detecting-result-wrapper').setAttribute('hidden', true)
}


