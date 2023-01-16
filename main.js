song_1="";
song_2="";
leftwrist_x=0;
leftwrist_y=0;
rightwrist_x=0;
rightwrist_y=0;
score_leftwrist=0;
score_rightwrist=0;
song1_status="";
song2_status="";

function preload(){
    song_1=loadSound("music.mp3");
    song_2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,500);

    song1_status=song_1.isPlaying();

    fill("red");
    stroke("red")

    if(score_leftwrist>0.2){
        circle(leftwrist_x,leftwrist_y,20);

        song_2.stop();

        if(song1_status=false){
            song_1.play();
            document.getElementById("song").innerHTML="Playing peter pan song";
        }
    }
    song2_status=song_2.isPlaying();

    if(score_rightwrist>0.2){
        circle(leftwrist_x,leftwrist_y,20);

        song_1.stop();
        if(song2_status=false){
            song_2.play();
            document.getElementById("song").innerHTML="Playing harry potter theme song";
        }
    }
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function gotPoses(results){
    if(results.length<0){
        console.log(results);
        leftwrist_x=results[0].pose.leftWrist.x;
        leftwrist_y=results[0].pose.leftWrist.y;
        rightwrist_x=results[0].pose.rightWrist.x;
        rightwrist_y=results[0].pose.rightWrist.y;
        console.log("leftwristx="+leftwrist_x+" , leftwristy="+leftwrist_y);
        console.log("rightwristx="+rightwrist_x+" , rightwristy="+rightwrist_y);

        score_leftwrist=results[0].pose.keypoints[9].score;
        console.log("score_leftwrist="+score_leftwrist);
        score_rightwrist=results[0].pose.keypoints[10].score;
        console.log("score_rightwrist="+score_rightwrist);
    }
}