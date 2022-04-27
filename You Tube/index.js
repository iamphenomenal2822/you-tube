// var menuIcon = document.querySelector(".menu-icon");
// var sidebar = document.querySelector(".sidebar");
// let container = document.querySelector("container");

// menuIcon.onclick = function(){
//     sidebar.classList.toggle("small-sidebar");
//     container.classList.toggle("large-container");
// }


let key = "AIzaSyAj4VmQFWc383Z_b-9GSc9r_pA9Tlrp9Vc";
let searchResultDiv = document.querySelector(".video-container");
// let url = `https://youtube.googleapis.com/youtube/v3/search?q=${container}&key=${key}&type=video&maxResults=25`;

const search_btn = async() =>{
    try{
        let container = document.querySelector(".search-bar").value;
        // console.log(container)

        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${container}&key=${key}&type=video&maxResults=25`);
        let data = await res.json();
        let videoList = data.items;
        console.log(videoList);
        displayData(videoList)
        console.log(data)
    }
    catch(err){
        console.log(err);
    }
};

const displayData = (videoArray) => {
    searchResultDiv.innerHTML = "";
    videoArray.forEach((video) => {
        const{
            id: {videoId},
        } = video;

        let videoCart = document.createElement("div");

        let Ifrem = document.createElement("iframe");
        Ifrem.src = `https://www.youtube.com/embed/${videoId}`;
        Ifrem.setAttribute("allowfullscreen",true);
        Ifrem.width = "100%";

        videoCart.append(Ifrem);
        searchResultDiv.append(videoCart)
    })
};
// search_btn();

let video = "https://youtube.googleapis.com/youtube/v3/videos?";
let channel = "https://youtube.googleapis.com/youtube/v3/channels?"

fetch(video + new URLSearchParams({
    key: key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults : 50,
    regionCode: 'IN',
}))
.then(res => res.json())
.then (data => {
    // console.log(data)
    data.items.forEach(item => {
        getChannelIcon(item);

    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel + new URLSearchParams({
        key: key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        console.log(video_data)
        makeVideoCart(video_data);
    })
}

const makeVideoCart = (data) =>{
    searchResultDiv.innerHTML += `<div class="video">
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail">
    <div class="content">
        <img src="${data.channelThumbnail}" class="channel-icon">
        <div class="info">
            <h4 class="title">${data.snippet.title}</h4>
            <p class="channel-name">${data.snippet.channelTitle}</p>
        </div>
    </div>`

}