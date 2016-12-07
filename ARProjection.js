function ARProjection(leftArrow, rightArrow, projectionDiv) {
    
    this.numViews = 0;
    this.currentView = null;
    this.views = [];
    this.startX = null;
    this.startY = null;
    this.movingX = null;
    this.movingY = null;
    this.endX = null;
    this.endY = null;
    this.xDifference = null;
    this.moveDirection = null;
    
    leftArrow.addEventListener('touchstart', this.leftArrowClicked.bind(this));
    
    rightArrow.addEventListener('touchstart', this.rightArrowClicked.bind(this));
    
    projectionDiv.addEventListener('touchstart', this.projectionDivClicked.bind(this));
    projectionDiv.addEventListener('touchmove', this.projectionDivMoved.bind(this));
    projectionDiv.addEventListener('touchend', this.projectionLetGo.bind(this));

}

ARProjection.prototype.addView = function(view) {
    this.views.push(view);
    view.parent = this;
}
ARProjection.prototype.projectionDivClicked = function(event) {
    //pause/play whichever element is visible
        if(event.targetTouches.length == 1) {
            this.currentView.handleAudio();
        } else if (event.targetTouches.length == 2) {
            //handle movement of CSS object
            event.preventDefault();
            this.startX = event.touches[0].clientX;
            this.startY = event.touches[0].clientY;
            
        }
}

ARProjection.prototype.projectionDivMoved = function(event) {
    //Follow projection move 
        cssObjectPlaylist.x = event.touches[0].clientX;
        cssObjectPlaylist.y = event.touches[0].clientY;
}
ARProjection.prototype.projectionLetGo = function(event) {
    //Snap back to position
        cssObjectPlaylist.x = this.startX;
        cssObjectPlaylist.y = this.startY;
}

ARProjection.prototype.rightArrowClicked = function(event) {
    
    this.moveDirection = "right"; 
    
    //current view position
    var viewPos = this.views.indexOf(this.currentView);
        
    if(this.currentView == this.views[3]) {
        //nothing can happen
    } else {
        //switch current views
        this.views[viewPos].isVisible = "false";
        
        if(this.views[viewPos].playState == "paused") {
            //Let track stay paused as div shifts
        } else {
            this.views[viewPos].handleAudio();
        }
        
        viewPos++;
        var newPos = viewPos;
        this.currentView = this.views[newPos];
        
        this.views[newPos].isVisible = "true";
        //must start initial play here because audio events in mobile need user click event to load
        this.views[newPos].handleAudio();
        //this.views[newPos].playState = "playing";
        this.currentView.transitionAnimation(newPos, this.moveDirection);    
    }
}

ARProjection.prototype.leftArrowClicked = function(event) {
    
    this.moveDirection = "left";
    
    //current view position
    var viewPos = this.views.indexOf(this.currentView);
    
    if(this.currentView == this.views[0]) {
        //nothing can happen
    } else {
        //switch current views
        this.views[viewPos].isVisible = "false";
        if(this.views[viewPos].playState == "paused") {
            //Let track stay paused as div shifts
        } else {
            this.views[viewPos].handleAudio();
        }

        viewPos--;
        var newPos = viewPos;
        this.currentView = this.views[newPos];        
        this.views[newPos].isVisible = "true";
        //this.views[newPos].track.play();
        this.views[newPos].handleAudio();

        this.currentView.transitionAnimation(newPos, this.moveDirection);     
    }
}

