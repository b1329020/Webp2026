
var imglist_Url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&per_page=10&format=json&nojsoncallback=1'; [cite: 14]

function getimg() {
    var xhr = new XMLHttpRequest(); // 投影片 Page 19: 使用 XMLHttpRequest 
    xhr.open('GET', imglist_Url, true);
    xhr.send();

    xhr.onload = function() {
        if (this.status == 200) {
            // 投影片 Page 3: 分析回傳的 JSON [cite: 3]
            var data = JSON.parse(this.responseText);
            // Flickr 的資料層級在 data.photos.photo [cite: 11]
            add_new_img(data.photos.photo);
        }
    };
}

function add_new_img(dataset) {
    var gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // 清空舊內容

    dataset.forEach(function(item) {
        var img = document.createElement('img');
        
        // 投影片 Page 19 形式呈現：拼接 Flickr 圖片 URL [cite: 4]
        // 格式參考：https://live.staticflickr.com/{server}/{id}_{secret}_{size}.jpg
        var photoUrl = 'https://live.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_z.jpg';
        
        img.src = photoUrl;
        gallery.appendChild(img);
    });
}
