let prevSong = 0;
let defaultSong = 'songs/1.mp3';
let audioElement = new Audio(defaultSong);
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = document.getElementsByClassName('songItem');
let forwardPlay = document.getElementById('forwardPlay');
let backwardPlay = document.getElementById('backwardPlay');
let intervalId;

let songs = [
    {SongName: "52 Bars", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {SongName: "Born to Shine", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {SongName: "Case", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {SongName: "Don't Look 2", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {SongName: "Jat Clan", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {SongName: "Knife Brows", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {SongName: "On the Top", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {SongName: "Softly", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {SongName: "Wavy", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {SongName: "Winning Speech", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
]

Array.from(songItems).forEach((songItem, i) => {
    songItem.getElementsByTagName('img')[0].src = songs[i].coverPath;
    songItem.getElementsByClassName('songName')[0].innerText = songs[i].SongName;
    songItem.setAttribute('data-index', i);
    let tempAudioElement = new Audio(songs[i].filePath);
    tempAudioElement.addEventListener('loadedmetadata', () => {
    
        let totalTime = tempAudioElement.duration;
        let minutes = Math.floor(totalTime / 60);
        let seconds = Math.floor(totalTime % 60);

        songItem.getElementsByClassName('timeStamp')[0].innerText = `${minutes} : ${seconds}`;
    });
});

masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        let el = document.querySelector(`[data-index="${prevSong}"]`);
        el.getElementsByTagName('i')[0].classList.remove('fa-circle-play');
        el.getElementsByTagName('i')[0].classList.add('fa-circle-pause');

        document.getElementById('currentSongName').innerText = songs[prevSong].SongName;
        enlarge(prevSong);
        if(document.getElementById('totalDuration').innerText == "") {
            printTotalDuration();
        }
        intervalId = setInterval(printCurrentDuration, 1000);
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        let el = document.querySelector(`[data-index="${prevSong}"]`);
        el.getElementsByTagName('i')[0].classList.remove('fa-circle-pause');
        el.getElementsByTagName('i')[0].classList.add('fa-circle-play');
        clearInterval(intervalId);
    }
})

audioElement.addEventListener('timeupdate', () => {
    if (isNaN(audioElement.duration) || audioElement.duration === 0) return;

    let progress = (audioElement.currentTime/audioElement.duration) * 100;
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
    let minutes = Math.floor(audioElement.currentTime / 60);
    let seconds = Math.floor(audioElement.currentTime % 60);
    if (seconds < 10) seconds = '0' + seconds;
    document.getElementById('currentProgress').innerText = `${minutes}:${seconds}`;
})


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {

        if(e.target.classList.contains('fa-circle-play')) {
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            let index = e.target.closest('.songItem').getAttribute('data-index');
            index = parseInt(index);

            let song = songs[index];
            if(prevSong != index) {
                audioElement.src = song.filePath;
                audioElement.load();
            }
            audioElement.play();

            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');

            if(prevSong != index) {
                let el = document.querySelector(`[data-index="${prevSong}"]`);
                el.getElementsByTagName('i')[0].classList.remove('fa-circle-pause');
                el.getElementsByTagName('i')[0].classList.add('fa-circle-play');

            }

            ensmall(prevSong);
            prevSong = index;
            gif.style.opacity = 1;

            document.getElementById('currentSongName').innerText = songs[prevSong].SongName;
            enlarge(prevSong);
            printTotalDuration()
            intervalId = setInterval(printCurrentDuration, 1000);
        }

        else {
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.pause();

            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');

            gif.style.opacity = 0;
            clearInterval(intervalId);
        }
    });
});


forwardPlay.addEventListener('click', () => {

    if(prevSong+1 < songs.length) {
        audioElement.src = songs[prevSong+1].filePath;
        audioElement.load();
        audioElement.play();

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

        let el = document.querySelector(`[data-index="${prevSong}"]`);
        el.getElementsByTagName('i')[0].classList.remove('fa-circle-pause');
        el.getElementsByTagName('i')[0].classList.add('fa-circle-play');

        el = document.querySelector(`[data-index="${prevSong+1}"]`);
        el.getElementsByTagName('i')[0].classList.remove('fa-circle-play');
        el.getElementsByTagName('i')[0].classList.add('fa-circle-pause');

        ensmall(prevSong);
        gif.style.opacity = 1;
        prevSong++;

        document.getElementById('currentSongName').innerText = songs[prevSong].SongName;
        enlarge(prevSong);
        printTotalDuration();
        intervalId = setInterval(printCurrentDuration, 1000);
    }

    else {
        audioElement.pause();
        gif.style.opacity = 0;


        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');

        let el = document.querySelector(`[data-index="${prevSong}"]`);
        el.getElementsByTagName('i')[0].classList.remove('fa-circle-pause');
        el.getElementsByTagName('i')[0].classList.add('fa-circle-play');
        clearInterval(intervalId);
    }
});


backwardPlay.addEventListener('click', () => {

    if(prevSong-1 >= 0) {
        audioElement.src = songs[prevSong-1].filePath;
        audioElement.load();
        audioElement.play();

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

        let el = document.querySelector(`[data-index="${prevSong}"]`);
        el.getElementsByTagName('i')[0].classList.remove('fa-circle-pause');
        el.getElementsByTagName('i')[0].classList.add('fa-circle-play');

        el = document.querySelector(`[data-index="${prevSong-1}"]`);
        el.getElementsByTagName('i')[0].classList.remove('fa-circle-play');
        el.getElementsByTagName('i')[0].classList.add('fa-circle-pause');

        ensmall(prevSong);
        gif.style.opacity = 1;
        prevSong--;

        document.getElementById('currentSongName').innerText = songs[prevSong].SongName;
        enlarge(prevSong);
        printTotalDuration();
        intervalId = setInterval(printCurrentDuration, 1000);

    }

    else {
        audioElement.pause();
        gif.style.opacity = 0;

        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');

        let el = document.querySelector(`[data-index="${prevSong}"]`);
        el.getElementsByTagName('i')[0].classList.remove('fa-circle-pause');
        el.getElementsByTagName('i')[0].classList.add('fa-circle-play');
        clearInterval(intervalId);
    }
});

function enlarge(prevSong) {
    let container = document.querySelector(`[data-index="${prevSong}"]`);
    let elements = container.querySelectorAll('*'); 

    elements.forEach(el => {
        el.style.transform = 'scale(1.1)';
        el.style.transition = 'transform 0.3s ease';
    });

};

function ensmall(prevSong) {
    let container = document.querySelector(`[data-index="${prevSong}"]`);
    let elements = container.querySelectorAll('*'); 

    elements.forEach(el => {
        el.style.transform = 'scale(1)';
        el.style.transition = 'transform 0.3s ease';
    });

};

function printTotalDuration() {
    if (audioElement.readyState >= 1) {
        updateDurationText(audioElement.duration);
    } else {
        audioElement.addEventListener('loadedmetadata', () => {
            updateDurationText(audioElement.duration);
        }, { once: true });
    }
}

function updateDurationText(duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    if (seconds < 10) seconds = '0' + seconds;
    document.getElementById('totalDuration').innerText = `${minutes}:${seconds}`;
}

function printCurrentDuration() {
    if (audioElement.readyState >= 1) {
        updateCurrentDurationText(audioElement.currentTime);
    } else {
        audioElement.addEventListener('loadedmetadata', () => {
            updateCurrentDurationText(audioElement.currentTime);
        }, { once: true });
    }
}

function updateCurrentDurationText(duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    if (seconds < 10) seconds = '0' + seconds;
    document.getElementById('currentProgress').innerText = `${minutes}:${seconds}`;
}

audioElement.addEventListener('ended', () => {
    audioElement.currentTime = 0;
    audioElement.play();
})