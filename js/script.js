import { movies } from "./db.js";
// movies = [new Set(movies)]
let ul = document.querySelector('.promo__interactive-list')
let promoList = document.querySelector('.promo__menu-list ul')
let promo_bg = document.querySelector('.promo__bg')
let promo__genre = document.querySelector('.promo__genre')
let promo__title = document.querySelector('.promo__title')
let promo__descr = document.querySelector('.promo__descr')
let Imbd = document.querySelector('.one')
let kinopoisk = document.querySelector('.two')
let modal = document.querySelector('.modal')
let modal__bg = document.querySelector('.modal__bg')
let modal__close = modal.querySelector('button')
let modal__type = modal.querySelector('h3')
let modal__input = modal.querySelector('input')
let modal__confirm = modal.querySelector('.modal__confirm')
let search = document.querySelector('.search')



function reload(arr) {
    for (let item of arr) {
        let li = document.createElement('li')
        let deleteDiv = document.createElement('div')
        let liList = document.createElement('li')
        let aList = document.createElement('a')
        deleteDiv.classList.add('delete')
        li.classList.add('promo__interactive-item')
        aList.classList.add('promo__menu-item')

        li.innerHTML = item.Title
        aList.innerHTML = item.Genre

        promoList.append(liList)
        liList.append(aList)
        li.append(deleteDiv)
        ul.append(li)


        aList.onclick = () => {
            aList.classList.remove('promo__menu-item_active')
            aList.classList.add('promo__menu-item_active')
        }

        li.onclick = () => {
            showMoviePromo(item)
            promo__genre.innerHTML = item.Genre
            promo__title.innerHTML = item.Title
            promo__descr.innerHTML = item.Plot
            Imbd.innerHTML = 'IMDb: ' + item.imdbRating
            kinopoisk.innerHTML = 'Кинопоиск: ' + item.Metascore
        }

        deleteDiv.onclick = () => {
            modal.style.display = 'block'
            modal__bg.style.display = 'block'
        }

        modal__close.onclick = () => {
            modal.style.scale = '.2'
            setTimeout(() => {
                modal.style.display = 'none'
                modal__bg.style.display = 'none'
            }, 400);
        }
    }
}

function showMoviePromo(movie) {
    promo_bg.style.background = `url(${movie.Poster})`
}


search.oninput = () => {
    let keySearch = search.value.toLocaleLowerCase()
    let re = new RegExp(keySearch)

    let filtered = movies.filter(item => {
        item.Title = item.Title.toLocaleLowerCase()
        if (item.Title.match(re)) {
            return item.Title
        }
    })

    secrhFunc(filtered, ul, keySearch)
}

function secrhFunc(arr2, place, keySearch = '') {
    place.innerHTML = ''

    for (let item of arr2) {
        let liOne = document.createElement('li')
        let del = document.createElement('div')

        del.classList.add('delete')
        liOne.classList.add('promo__interactive-item')

        liOne.innerHTML = item.Title.replace(`<b>${keySearch}</b>`)
        liOne.append(del)
        place.append(liOne)

        liOne.onclick = () => {
            showMoviePromo(item)
            promo__genre.innerHTML = item.Genre
            promo__title.innerHTML = item.Title
            promo__descr.innerHTML = item.Plot
            Imbd.innerHTML = 'IMDb: ' + item.imdbRating
            kinopoisk.innerHTML = 'Кинопоиск: ' + item.Metascore
        }

        del.onclick = () => {
            modal.style.scale = '1'
            openModal(item.Title)
            modal.style.background = `url(${item.Poster})`
        }

        modal__close.onclick = () => {
            modal.style.scale = '.2'
            setTimeout(() => {
                modal.style.display = 'none'
                modal__bg.style.display = 'none'
            }, 400);

        }
    }
}

function openModal(data) {
    modal.style.display = 'block'
    modal__bg.style.display = 'block'
    modal__type.innerHTML = data

    modal__confirm.onclick = () => {
        if (modal__input.value.trim() === data) {
            // movies = movies.forEach(x => x.Title !== data)
            // reload(movies, ul)
            modal.style.display = ''
            modal__bg.style.display = ''
            modal__input.value = ''
        }
        else {
            alert('error')
        }
    }
}

reload(movies)
secrhFunc(movies, ul)


