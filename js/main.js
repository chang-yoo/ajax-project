function comingMovie() {
  var $ul = document.querySelector('.list');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/ComingSoon/k_4003h2lv');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var items = xhr.response.items;
    for (var i = 0; i < items.length; i++) {
      var description = movieDescription(items[i]);
      $ul.append(description);
    }
  });
  xhr.send();
}
window.addEventListener('load', comingMovie);

function movieDescription(object) {
  var $li = document.createElement('li');

  var $briefCon = document.createElement('div');
  $briefCon.setAttribute('class', 'brief-container');
  $li.append($briefCon);

  var $briefImg = document.createElement('div');
  $briefImg.setAttribute('class', 'image-container');
  $briefCon.appendChild($briefImg);

  var $img = document.createElement('img');
  $img.setAttribute('src', object.image);
  $img.setAttribute('class', 'brief-image');
  $briefImg.appendChild($img);

  var $briefDesc = document.createElement('div');
  $briefDesc.setAttribute('class', 'brief-description text-align-center');
  $briefCon.append($briefDesc);

  var $anchor = document.createElement('a');
  $anchor.setAttribute('href', '#');
  $briefDesc.append($anchor);

  var $title = document.createElement('p');
  $title.setAttribute('data-id', object.id);
  $title.setAttribute('class', 'detailed-title');
  $title.textContent = object.title;
  $anchor.append($title);

  var $year = document.createElement('h6');
  $year.setAttribute('data-id', object.id);
  $year.setAttribute('class', 'detailed-year');
  $year.textContent = object.year;
  $anchor.append($year);
  return $li;
}

function detailsMovie(object) {
  var $row = document.createElement('div');
  $row.setAttribute('class', 'row details');

  var $detailImgCont = document.createElement('div');
  $detailImgCont.setAttribute('class', 'detailed-image-container column-one-third');
  $row.append($detailImgCont);

  var $img = document.createElement('img');
  $img.setAttribute('src', object.image);
  $img.setAttribute('class', 'detailed-image column-half');
  $detailImgCont.append($img);

  var $detailedText = document.createElement('div');
  $detailedText.setAttribute('class', 'column-half detailed-text');
  $row.append($detailedText);

  var $descriptionBox = document.createElement('div');
  $descriptionBox.setAttribute('class', 'detailed-box text-align-center');
  $detailedText.append($descriptionBox);

  var $desciptionText = document.createElement('div');
  $desciptionText.setAttribute('class', 'description-box');
  $descriptionBox.append($desciptionText);

  var $descriptionTitle = document.createElement('h4');
  $descriptionTitle.textContent = 'Title: ' + object.title;
  $desciptionText.append($descriptionTitle);

  var $descriptionReleaseDate = document.createElement('h4');
  $descriptionReleaseDate.textContent = 'Release Date: ' + object.releaseState;
  $desciptionText.append($descriptionReleaseDate);

  var $descriptionRunningTime = document.createElement('h4');
  $descriptionRunningTime.textContent = 'Running Time in Minutes: ' + object.runtimeMins + ' mins';
  $desciptionText.append($descriptionRunningTime);

  var $descriptionGenre = document.createElement('h4');
  $descriptionGenre.textContent = 'Genre: ' + object.genres;
  $desciptionText.append($descriptionGenre);

  var $descriptionDirector = document.createElement('h4');
  $descriptionDirector.textContent = 'Director: ' + object.directors;
  $desciptionText.append($descriptionDirector);

  var $descriptionStars = document.createElement('h4');
  $descriptionStars.textContent = 'Stars: ' + object.stars;
  $desciptionText.append($descriptionStars);

  var $plotBox = document.createElement('div');
  $plotBox.setAttribute('class', 'detailed-box text-align-center');
  $detailedText.append($plotBox);

  var $descriptionPlot = document.createElement('div');
  $descriptionPlot.setAttribute('class', 'description-box');
  $plotBox.append($descriptionPlot);

  var $plotText = document.createElement('h4');
  $plotText.textContent = 'BRIEF PLOT';
  $descriptionPlot.append($plotText);

  var $plot = document.createElement('h4');
  $plot.textContent = object.plot;
  $descriptionPlot.append($plot);

  return $row;
}

function hideList() {
  var $listText = document.querySelector('.list-text');
  var $listContainer = document.querySelector('.list-container');
  $listText.setAttribute('class', 'list-text text-align-center hidden');
  $listContainer.setAttribute('class', 'list-container column-full hidden');
  var $details = document.querySelector('.detail-container');
  $details.setAttribute('class', 'column-full detail-container');
}

function showList() {
  var $listText = document.querySelector('.list-text');
  var $listContainer = document.querySelector('.list-container');
  $listText.setAttribute('class', 'list-text text-align-center');
  $listContainer.setAttribute('class', 'list-container column-full');
  var $details = document.querySelector('.detail-container');
  var $row = document.querySelector('.details');
  $details.setAttribute('class', 'hidden detail-container full-column');
  $details.removeChild($row);
  hideWatchList();
}

var $listContainer = document.querySelector('.list-container');
var $watchList = document.querySelector('.watch-list');

function viewWatchList(event) {
  $listContainer.className = 'hidden list-container column-full';
  $watchList.className = 'watch-list-container column-full';
}
viewWatchList();

function hideWatchList(event) {
  $listContainer.className = 'list-container column-full';
  $watchList.className = 'hidden watch-list-container column-full';

}

var $ul = document.querySelector('.list');

$ul.addEventListener('click', getDetails);

function getDetails(event) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/ComingSoon/k_4003h2lv');
  xhr.responseType = 'json';
  if (event.target.tagName === 'P') {
    var text = event.target.closest('p');
    var $textIds = text.getAttribute('data-id');
    var stringId = String($textIds);
  } else {
    showList();
  }
  hideList();
  xhr.addEventListener('load', function (event) {
    var items = xhr.response.items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === stringId) {
        var singleMovie = items[i];
        var descriptionOfSingleMovie = detailsMovie(singleMovie);
        var $detailContainer = document.querySelector('.detail-container');
        $detailContainer.append(descriptionOfSingleMovie);
      }
    }
  });
  xhr.send();
}

var $homeBtn = document.querySelector('.header-home');
$homeBtn.addEventListener('click', showList);

var $addToList = document.querySelector('.add-to-list');

$addToList.addEventListener('click', function addToWatchList(event) {
  var $img = document.querySelector('.detailed-image');
  var $imgValue = $img.getAttribute('src');
  var $title = document.querySelector('.detailed-title');
  var $year = document.querySelector('.detailed-year');
  var $id = $title.getAttribute('data-id');
  var datas = {
    image: $imgValue,
    title: $title.textContent,
    year: $year.textContent,
    id: String($id)
  };
  data.movie.push(datas);
  movieDescription(datas);
  $addingPopUp.className = 'adding-btn-popup-container column-full';
});

var $addingPopUp = document.querySelector('.adding-btn-popup-container');
var $popUpPerfectBtn = document.querySelector('.popup-confirm-btn');
$popUpPerfectBtn.addEventListener('click', popUpRemove);

function popUpRemove(event) {
  $addingPopUp.className = 'hidden adding-btn-popup-container column-full';
}
