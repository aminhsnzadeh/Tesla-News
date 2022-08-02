
document.getElementById('nav-btn').addEventListener('click', ()=> {
    document.querySelector('.mobile-nav>ul').classList.toggle('nav-active')
    if(document.getElementById('nav-btn').className == 'bi-list') {
        document.getElementById('nav-btn').classList.remove('bi-list')
        document.getElementById('nav-btn').classList.add('bi-x')
    } else {
        document.getElementById('nav-btn').classList.add('bi-list')
        document.getElementById('nav-btn').classList.remove('bi-x')
    }
})
//===================================================================================
async function dataFetch() {
    let _date = new Date()
    const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from='+ _date.getFullYear() +'-'+_date.getFullMonth+'-'+ _date.getFullDay +'&sortBy=publishedAt&apiKey=e84fe8df669047ba9c399cab6add55e3')
    const data = await response.json()

    return data
}
dataFetch().then(data = (data)=> {
    let _flag = 9
    document.getElementById('more').addEventListener('click', ()=> {
        _flag += 9
        document.querySelector('.page-1').innerHTML = ''
        for(let i = 0; i < _flag; i++) {
            const _dataNews = new allNews(data.articles[i].title, data.articles[i].description, data.articles[i].publishedAt, data.articles[i].author, data.articles[i].urlToImage, data.articles[i].url, data.articles[i].content, i+1)
            document.querySelector('.page-1').appendChild(_dataNews.show())
            popSystem(i)
        }
    })
    for(let i = 0; i < 9; i++) {
        const _dataNews = new allNews(data.articles[i].title, data.articles[i].description, data.articles[i].publishedAt, data.articles[i].author, data.articles[i].urlToImage, data.articles[i].url, data.articles[i].content, i+1)
        document.querySelector('.page-1').appendChild(_dataNews.show())
        popSystem(i)
    }


})
class allNews {
    constructor(head, desc, date, auth, img, url, msg, num) {
        this.head = head
        this.desc = desc
        this.date = date
        this.auth = auth
        this.img = img
        this.url = url
        this.msg = msg
        this.num = num
    }
    show() {
        const _div = document.createElement('div')
        _div.classList.add('card-news-main')
        if(this.auth == null || this.auth == '') {
            this.auth = 'author name'
        }
        _div.innerHTML = `
            <figure>
                <img src="${this.img}" alt="">
                <figcaption><span>${this.num}</span></figcaption>
            </figure>
            <article>
                <div>
                    <h2 class="head-news">${this.head}</h2>
                    <div>
                        <h3 class="fe-italic-bold">${this.auth}</h3>
                        <h4 class="fe-italic-ligth">" ${this.date} "</h4>
                    </div>
                    <p class="para-light">${this.desc}</p>
                </div>
                <h3 class="fe-italic-medium pop-up-click">Read More</h3>
            </article>
            <section class="pop-up">
                <span class="bi-x-circle pop-up-closing"></span>
                <section class="inner-pop">
                    <div>
                        <figure>
                            <img src="${this.img}" alt="">
                        </figure>
                        <div>
                            <h2 class="head-news">${this.head}</h2>
                            <div>
                                <h3 class="fe-italic-bold">${this.auth}</h3>
                                <h4 class="fe-italic-ligth">" ${this.date} "</h4>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="para-news">${this.msg}</p>
                        <a href="${this.url}" target="_blank" class="fe-italic-medium">View Source</a>
                    </div>
                </section>
            </section>
        `
        return _div
    }
}
const popSystem = (i)=> {
    document.querySelectorAll('.pop-up-click')[i].addEventListener('click', function() {
        this.parentElement.parentElement.classList.add('pop-active')
    })
    document.querySelectorAll('.pop-up-closing')[i].addEventListener('click', function() {
        this.parentElement.parentElement.classList.remove('pop-active')
    })
}
