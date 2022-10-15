song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeft = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    pose = ml5.poseNet(video, modelLoaded);
    pose.on("pose", gotResults);
}

function draw() {
    image(video, 0, 0, 500, 500);

    fill("#ff0000");
    stroke("ff0000");
    circle(leftWristX, leftWristY, 20);

    if(scoreLeft > .2) {
        numberleft = Number(leftWristX);
    volume = floor(numberleft)/500;
    song.setVolume(volume);
    document.getElementById("volume").innerHTML = "Volume - " + volume*100 + "%";
    }
}

function play() {
    song.setVolume(1);
    song.rate(1);
    song.play();
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function gotResults(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X: " + leftWristX + "Left wrist Y: " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X: " + rightWristX + "Right wrist Y: " + rightWristY);

        scoreLeft = results[0].pose.keypoints[9].score;
    }
}