

document.getElementById('submitBtn').addEventListener('click', function(){
    searchSongs();
    const lyricArea= document.getElementById('lyric-area');
    lyricArea.innerText= "";
})

const searchSongs= ()=>{
    const searchField= document.getElementById('search-field').value;
    const url= `https://api.lyrics.ovh/suggest/${searchField}`;
    fetch(url)
    .then(res=> res.json())
    .then(data=> displaySongs(data.data))
}

const displaySongs= (songs)=>{
    const songList= document.getElementById('song-list');
    songList.innerHTML='';
    for (let i = 0; i < 10; i++) {
        const songDiv= document.createElement('div');
        songDiv.className='single-result row align-items-center my-3 p-3';
        songDiv.innerHTML= `
        <div class="col-md-9">
            <h3 class="lyrics-name">${songs[i].title}</h3>
            <p class="author lead">by ${songs[i].artist.name}</p>
            <audio controls>
                <source src="${songs[i].preview}" type="audio/mpeg">
            </audio>
        </div>
        
        <div class="col-md-3 text-md-right text-center">
            <button onclick='getLyric("${songs[i].title}", "${songs[i].artist.name}")' class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songList.appendChild(songDiv);
    }
}

const getLyric= (song, artist)=> {
    
    const url= `https://api.lyrics.ovh/v1/${artist}/${song}`

        
        try {
            fetch(url)
            .then(res=> res.json())
            .then(data=> displayLyrics(data))
          }//end try
          catch (e) {
              console.log(2000)
          }//end catch
   
}

const displayLyrics= (song)=> {
    const lyricArea= document.getElementById('lyric-area');
    lyricArea.innerText= song.lyrics;
    
}
