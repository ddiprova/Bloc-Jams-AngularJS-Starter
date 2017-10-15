(function() {
      function SongPlayer(Fixtures) {
          var SongPlayer = {};

          /**
          * @desc access the album
          * @type {Object}
          */
          var currentAlbum = Fixtures.getAlbum();

          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;

          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
          var setSong = function(song) {
            if (currentBuzzObject) {
                  stopSong();
          //      currentBuzzObject.stop();
          //      SongPlayer.currentSong.playing = null;
              }

              currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
              });
              SongPlayer.currentSong = song;
            };

            /*
            * @function playSong
            * @desc Starts playing song and sets song.playing to true
            * @param {Object} song
            */
            var playSong = function(song) {
      //        console.log("length = ", + currentAlbum.songs.length)
              currentBuzzObject.play();
              song.playing = true;
            };

            /*
            * @function stopSong
            * @desc Stops playing song and sets song.playing to null
            * @param {Object} song
            */
            var stopSong = function(song) {
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;
        //      song.playing = null;
            };

          /*
          * @desc Get song index from album
          * @type {Object}
          */
          var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);
            };

          /*
          * @desc Active song object from list of songs
          * @type {Object}
          */
          SongPlayer.currentSong = null;


          /* @function play
          * @desc Play current or new song
          * @param {Object} song
          */

          SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      playSong(song);
                  }
              }
            };

            /* @function pause
            * @desc Pauses the current playing song
            * @param {Object} song
            */

             SongPlayer.pause = function(song) {
                song = song || SongPlayer.currentSong;
                currentBuzzObject.pause();
                song.playing = false;
           };


     /* @function previous song
     * @desc play the previous song on the album
     * @param {Object} SongPlayer.currentSong
     */
     SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
    //   console.log("currentSongIndex = ", + currentSongIndex);
     if (currentSongIndex < 0) {
          stopSong();
    //     currentBuzzObject.stop();
    //     SongPlayer.currentSong.playing = null;
       } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
      }
 };

      /* @function next song
      * @desc play the next song on the album
      * @param {Object} SongPlayer.currentSong
      */
      SongPlayer.next = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
    //        console.log("currentSongIndex = ", + currentSongIndex);
            if (currentSongIndex >= currentAlbum.songs.length) {
                 stopSong();
  //              currentBuzzObject.stop();
  //              SongPlayer.currentSong.playing = null;
            } else {
                    var song = currentAlbum.songs[currentSongIndex];
                    setSong(song);
                    playSong(song);
                  }
            };

        return SongPlayer;
    };



     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
