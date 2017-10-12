(function() {
     function SongPlayer() {
          var SongPlayer = {};

          /**
          * @desc current song placeholder
          * @type {Object}
          */
          var currentSong = null;
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
                currentBuzzObject.stop();
                currentSong.playing = null;
              }

              currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
              });
              currentSong = song;
            };

          /*
          * @function playSong
          * @desc Starts playing song and sets song.playing to true
          * @param {Object} song
          */
          var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
          };

    /* @function SongPlayer.play
    * @desc Checks current song, if not equal to selected song, sets song to current playing song, begins playing song
    *       if it is selected song, pause the current song and play the selected song
    * @param {Object} song
    */

    SongPlayer.play = function(song) {
      if (currentSong !== song) {
          setSong(song);
          playSong(song);
      } else if (currentSong === song) {
            if (currentBuzzObject.isPaused()) {
                playSong(song);
            }
        }
      };

      /* @function SongPlayer.pause
      * @desc Pauses the current playing song
      * @param {Object} song
      */

       SongPlayer.pause = function(song) {
          currentBuzzObject.pause();
          song.playing = false;
     };
        return SongPlayer;
    };



     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
