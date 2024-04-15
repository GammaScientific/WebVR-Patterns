/*
    Listens for button inputs and handles them accordingly.
    Any button press on the left controller will move backwards one scene.
    Any button press on the right controller will move forward one scene.
    
*/

/* Code to register thumbstick behavior for left hand */
AFRAME.registerComponent('thumbstick-left',{
init: function () {
    this.el.addEventListener('thumbstickmoved', this.logThumbstick);
},
    logThumbstick: function (evt) {
        thumbstickDetailL.x = evt.detail.x
        thumbstickDetailL.y = evt.detail.y
    }
});

/*  */
AFRAME.registerComponent('thumbstick-right',{
init: function () {
    this.el.addEventListener('thumbstickmoved', this.logThumbstick);
},
    logThumbstick: function (evt) {
        thumbstickDetailR.x = evt.detail.x
        thumbstickDetailR.y = evt.detail.y

    }
});

AFRAME.registerComponent('trackpad-left',{
    init: function () {
        this.el.addEventListener('trackpadmoved', this.logTrackpad);
    },
        logTrackpad: function (evt) {
            trackpadDetailL.x = evt.detail.x;
            trackpadDetailL.y = evt.detail.y;

        }
    });
    
    /*  */
    AFRAME.registerComponent('trackpad-right',{
    init: function () {
        this.el.addEventListener('trackpadmoved', this.logTrackpad);
    },
        logTrackpad: function (evt) {
            trackpadDetailR.x = evt.detail.x;
            trackpadDetailR.y = evt.detail.y;

        }
    });

AFRAME.registerComponent('button-listener-r', {
init: function () {
    var el = this.el;

    el.addEventListener('gripdown', function (evt) {
        buttonsDownR['grip'] = true;
        if(thumbstickDetailR.y <= -.95 || trackpadDetailR.y <= -.95){
            displayNext(false)
        } else if(thumbstickDetailR.y >= .95 || trackpadDetailR.y >= .95){
            displayNext(true);
        }
        
    });
    
    el.addEventListener('gripup', function (evt) {
        buttonsDownR['grip'] = false;
    });

    el.addEventListener('triggerdown', function (evt) {
        buttonsDownR['trigger'] = true;
        if(thumbstickDetailR.y <= -.95 || trackpadDetailR.y <= -.95){
            displayNext(false)
        } else if(thumbstickDetailR.y >= .95 || trackpadDetailR.y >= .95){
            displayNext(true);
        }
    });
    
    el.addEventListener('triggerup', function (evt) {
        buttonsDownR['grip'] = false;
    });

    el.addEventListener('abuttondown', function (evt) {
        buttonsDownR['abutton'] = true;
    });
    el.addEventListener('abuttonup', function (evt) {
        buttonsDownR['abutton'] = false;
    });

    el.addEventListener('bbuttondown', function (evt) {
        buttonsDownR['bbutton'] = true;
    });
    el.addEventListener('bbuttonup', function (evt) {
        buttonsDownR['bbutton'] = false;
    });

    /*el.addEventListener('menudown', function (evt) {
        menuRightPressed = true;
        rightMenu.setAttribute("value", "Right Menu: Yes"); rightMenu.setAttribute("color","green")
    });*/

    el.addEventListener('thumbstickdown', function (evt) {
        buttonsDownR['thumbstick'] = true;
        if(thumbstickDetailR.y <= -.95){
            stopAll()
        } else if(thumbstickDetailR.x >= .95){
            if(startAllButton.disabled){
                pauseAll();
            } else {
                startAll();
            }
        }
    });
    el.addEventListener('thumbstickup', function (evt) {
        buttonsDownR['thumbstick'] = false;
    });

    el.addEventListener('trackpaddown', function (evt) {
        buttonsDownR['trackpad'] = true;
        console.log('trackpad pressed')
        console.log(trackpadDetailR)
        if(trackpadDetailR.y <= -.95){
            stopAll()
        } else if(trackpadDetailR.x >= .95){
            if(startAllButton.disabled){
                pauseAll();
            } else {
                startAll();
            }
        }
    });

    el.addEventListener('trackpadup', function (evt) {
        buttonsDownR['trackpad'] = false;
    });
}
});

AFRAME.registerComponent('button-listener-l', {
init: function () {
    var el = this.el;

    el.addEventListener('gripdown', function (evt) {
        buttonsDownL['grip'] = true;
        if(thumbstickDetailL.y <= -.95 || trackpadDetailL.y <= -.95){
            displayNext(false)
        } else if(thumbstickDetailL.y >= .95 || trackpadDetailL.y >= .95){
            displayNext(true);
        }
    });
    
    el.addEventListener('gripup', function (evt) {
        buttonsDownL['grip'] = false;
    });

    el.addEventListener('triggerdown', function (evt) {
        buttonsDownL['trigger'] = true;
        if(thumbstickDetailL.y <= -.95 || trackpadDetailL.y <= -.95){
            displayNext(false)
        } else if(thumbstickDetailL.y >= .95 || trackpadDetailL.y >= .95){
            displayNext(true);
        }
    });
    
    el.addEventListener('triggerup', function (evt) {
        buttonsDownL['grip'] = false;
    });

    el.addEventListener('xbuttondown', function (evt) {
        buttonsDownL['xbutton'] = true;
    });
    
    el.addEventListener('xbuttonup', function (evt) {
        buttonsDownL['xbutton'] = false;
    });

    el.addEventListener('ybuttondown', function (evt) {
        buttonsDownL['ybutton'] = true;
    });
    
    el.addEventListener('ybuttonup', function (evt) {
        buttonsDownL['ybutton'] = false;
    });

    el.addEventListener('thumbstickdown', function (evt) {
        buttonsDownL['thumbstick'] = true;
        if(thumbstickDetailL.y <= -.95){
            stopAll()
        } else if(thumbstickDetailL.x >= .95){
            if(startAllButton.disabled){
                pauseAll();
            } else {
                startAll();
            }
        }
    });
    el.addEventListener('thumbstickup', function (evt) {
        buttonsDownL['thumbstick'] = false;
    });

    el.addEventListener('trackpaddown', function (evt) {
        buttonsDownL['trackpad'] = true;
        if(trackpadDetailL.y <= -.95){
            stopAll()
        } else if(trackpadDetailL.x >= .95){
            if(startAllButton.disabled){
                pauseAll();
            } else {
                startAll();
            }
        }
    });

    el.addEventListener('trackpadup', function (evt) {
        buttonsDownL['trackpad'] = false;
    });

}
});

thumbstickDetailL = {x: 0, y: 0}
trackpadDetailL = {x: 0, y: 0}
buttonsDownL = {trigger: false, grip: false, trackpad: false, thumbstick: false, abutton: false, bbutton: false}

thumbstickDetailR = {x: 0, y: 0}
trackpadDetailR = {x: 0, y: 0}
buttonsDownR = {trigger: false, grip: false, trackpad: false, thumbstick: false, xbutton: false, ybutton: false}



// trigger/grip controls pattern selection
    // trigger while holding up- go to previous pattern
    // trigger while holding down- go to next pattern

// thumbstick/trackpad controls animations
    // thumbstick while holding right- start/pause
    // thumbstick while holding down- stop animation