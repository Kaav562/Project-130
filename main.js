song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scoreRightWrist = 0;
Status = "";


function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup()
{
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Initiated!');
}
function gotPoses(results)
{
    if(results.length > 0)
    scoreleftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    {console.log(results)};
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
}
function draw()
{
    image(video, 0, 0, 500, 400);
    fill('red');
    stroke('red');
    Status = song1.isPlaying();
    if(scoreleftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(Status == false)
        {
            song1.play();
            document.getElementById("Song_name").innerHTML = "music.mp3";
            
        }
    }
    Status = song2.isPlaying();
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(Status == false)
        {
            song2.play();
            document.getElementById("Song_name").innerHTML = "music2.mp3";
            
        }
    }
}
