new Vue({
    el: "#app",
    
    data() {
      return {
        audio: null,
        circleLeft: null,
        barWidth: null,
        duration: null,
        currentTime: null,
        isTimerPlaying: false,
        tracks: [
            
          {
            name: "One Love",
            artist: "Shubh",
            cover: "51QEZ5G10cL._UXNaN_FMjpg_QL85_.jpg",
            source: "One Love.mp3",
            url: "https://youtu.be/0pWsCiBvLOk?si=HQzaC-o_Dh_1BNLV",
            favorited: false
          },
          {
            name: "Desi kalakar ",
            artist: "YO YO Honey singh",
            cover: "Desi-Kalakaar-Hindi-2014-500x500.jpg",
            source: "128-Desi Kalakaar - Desi Kalakaar 128 Kbps.mp3",
            url: "https://www.youtube.com/watch?v=IHNzOHi8sJs&ab_channel=BLACKPINK",
            favorited: true
          },
  
          {
            name: "Saware",
            artist: "Arijit Singh,pritam",
            cover: "saware-phantom.jpg",
            source: "Saware - Phantom 128 Kbps.mp3",
            url: "https://www.youtube.com/watch?v=dyRsYk0LyA8&ab_channel=BLACKPINK",
            favorited: false
          },
  
          {
            name: "295",
            artist: "Sidhu Moosewala",
            cover: "295.jpg",
            source: "295_1.mp3",
            url: "https://www.youtube.com/watch?v=Amq-qlqbjYA&ab_channel=BLACKPINK",
            favorited: true
          },
          {
            name: "See you again",
            artist: "Wiz Khalifa",
            cover: "artworks-yeOBnmFyGyovASoQ-4xdMFQ-t500x500.jpg",
            source: "See-You-Again(musicdownload.cc).mp3",
            url: "https://www.youtube.com/watch?v=XsX3ATc3FbA&ab_channel=HYBELABELS",
            favorited: false
          },
          {
            name: "Shape Of You",
            artist: "Ed Sheeran",
            cover: "artworks-000202209096-m1x39j-t500x500.jpg",
            source: "Shape-of-You-(Lofi)(PagalWorldl).mp3",
            url: "https://www.youtube.com/watch?v=gdZLi9oWNZg&ab_channel=HYBELABELS",
            favorited: true
          },
          {
            name: "Excuses",
            artist: "AP Dhillon",
            cover: "sExcuses.jpg",
            source: "Excuses_1.mp3",
            url: "https://www.youtube.com/watch?v=MBdVXkSdhwU&ab_channel=HYBELABELS",
            favorited: false
          },
          {
            name: "Laal Bindi",
            artist: "AKULL",
            cover: "crop_480x480_2123757.jpg",
            source: "Laal Bindi - DjPunjab.Com.Se.mp3",
            url: "https://youtu.be/0pWsCiBvLOk?si=HQzaC-o_Dh_1BNLV",
            favorited: false
          },
          {
            name:"Pee Loon",
            artist: "Pritam, Mohit Chauhan",
            cover: "desktop-wallpaper-milan-luthria-on-twitter-pee-loon.jpg",
            source: "128-Pee Loon Hoto Ki Sargam - Once Upon A Time In Mumbaai 128 Kbps.mp3",
            url: "",
            favorited: false
          },
          
        ],
        currentTrack: null,
        currentTrackIndex: 0,
        transitionName: null
      };
    },
    methods: {
      play() {
        if (this.audio.paused) {
          this.audio.play();
          this.isTimerPlaying = true;
        } else {
          this.audio.pause();
          this.isTimerPlaying = false;
        }
      },
      generateTime() {
        let width = (100 / this.audio.duration) * this.audio.currentTime;
        this.barWidth = width + "%";
        this.circleLeft = width + "%";
        let durmin = Math.floor(this.audio.duration / 60);
        let dursec = Math.floor(this.audio.duration - durmin * 60);
        let curmin = Math.floor(this.audio.currentTime / 60);
        let cursec = Math.floor(this.audio.currentTime - curmin * 60);
        if (durmin < 10) {
          durmin = "0" + durmin;
        }
        if (dursec < 10) {
          dursec = "0" + dursec;
        }
        if (curmin < 10) {
          curmin = "0" + curmin;
        }
        if (cursec < 10) {
          cursec = "0" + cursec;
        }
        this.duration = durmin + ":" + dursec;
        this.currentTime = curmin + ":" + cursec;
      },
      updateBar(x) {
        let progress = this.$refs.progress;
        let maxduration = this.audio.duration;
        let position = x - progress.offsetLeft;
        let percentage = (100 * position) / progress.offsetWidth;
        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }
        this.barWidth = percentage + "%";
        this.circleLeft = percentage + "%";
        this.audio.currentTime = (maxduration * percentage) / 100;
        this.audio.play();
      },
      clickProgress(e) {
        this.isTimerPlaying = true;
        this.audio.pause();
        this.updateBar(e.pageX);
      },
      prevTrack() {
        this.transitionName = "scale-in";
        this.isShowCover = false;
        if (this.currentTrackIndex > 0) {
          this.currentTrackIndex--;
        } else {
          this.currentTrackIndex = this.tracks.length - 1;
        }
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
      },
      nextTrack() {
        this.transitionName = "scale-out";
        this.isShowCover = false;
        if (this.currentTrackIndex < this.tracks.length - 1) {
          this.currentTrackIndex++;
        } else {
          this.currentTrackIndex = 0;
        }
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
      },
      resetPlayer() {
        this.barWidth = 0;
        this.circleLeft = 0;
        this.audio.currentTime = 0;
        this.audio.src = this.currentTrack.source;
        setTimeout(() => {
          if(this.isTimerPlaying) {
            this.audio.play();
          } else {
            this.audio.pause();
          }
        }, 300);
      },
      favorite() {
        this.tracks[this.currentTrackIndex].favorited = !this.tracks[
          this.currentTrackIndex
        ].favorited;
      }
    },
   
    searchTracks() {
      if (this.searchQuery) {
        // Remove leading/trailing spaces and convert the query to lowercase
        const query = this.searchQuery.trim().toLowerCase();
    
        // Filter tracks based on the search query
        this.searchResults = this.tracks.filter(track => {
          const trackName = track.name.toLowerCase();
          const trackArtist = track.artist.toLowerCase();
    
          return trackName.includes(query) || trackArtist.includes(query);
        });
      } else {
        // If the search query is empty, clear the search results
        this.searchResults = [];
      }
    },
    created() {
      let vm = this;
      this.currentTrack = this.tracks[0];
      this.audio = new Audio();
      this.audio.src = this.currentTrack.source;
      this.audio.ontimeupdate = function() {
        vm.generateTime();
      };
      this.audio.onloadedmetadata = function() {
        vm.generateTime();
      };
      this.audio.onended = function() {
        vm.nextTrack();
        this.isTimerPlaying = true;
      };
     
      // this is optional (for preload covers)
      for (let index = 0; index < this.tracks.length; index++) {
        const element = this.tracks[index];
        let link = document.createElement('link');
        link.rel = "prefetch";
        link.href = element.cover;
        link.as = "image"
        document.head.appendChild(link)
      }
    }
    });
  
