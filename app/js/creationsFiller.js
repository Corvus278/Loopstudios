function creationCard({ title }) {
  const createImg = title => title.toLowerCase().trim().replaceAll(' ', '_')

  const imgSrc = createImg(title)
  const imgSrcSmall = createImg(title) + '--small'

  return `<li class="creations__item creation">
            <picture class="creation__picture">
              <source srcset="./images/dest/cards/${imgSrcSmall}.jpg" media="(max-width:768px)">
              <img src="./images/dest/cards/${imgSrc}.jpg" alt="${title}">
            </picture>
            <h3 class="creation__title caps">
              ${title}
            </h3>
          </li>`
}

const cardList = document.querySelector('.creations')

DATA.creationsCards.forEach(card => cardList.innerHTML += creationCard(card))