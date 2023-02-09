import { movies } from "./db.js";
let ul = document.querySelector('.promo__interactive-list')
let promoList = document.querySelector('.promo__menu-list ul')
let promo_bg = document.querySelector('.promo__bg')
let promo__genre = document.querySelector('.promo__genre')
let promo__title = document.querySelector('.promo__title')
let promo__descr = document.querySelector('.promo__descr')
let Imbd = document.querySelector('.one')
let kinopoisk = document.querySelector('.two')

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
            item.style.display = 'none'
        }
    }
}

function showMoviePromo(movie) {
    promo_bg.style.background = `url(${movie.Poster})`
}

reload(movies)


