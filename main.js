function preload() {
    song1 = loadSound("song1.mp3")
    song2 = loadSound("song2.mp3")
}

lefthandscore = 0
righthandscore = 0
rightwrostx = 0
leftwrostx = 0
rightwrosty = 0
leftwrosty = 0
song1status + ""
song2status = ""

function setup() {
    canvas = createCanvas(600, 500)
    canvas.position(550, 300)
    video = createCapture(VIDEO)
    video.hide()
    posenet = ml5.poseNet(video, modeLoaded)
    posenet.on('pose', gotPoses)
}

function modeLoaded() {


    console.log("Mododle lododed succesfully")

}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        lefthandscore = results[0].pose.keypoints[9].score
        righthandscore = results[0].pose.keypoints[10].score
        leftwrostx = results[0].pose.leftWrist.x
        leftwrosty = results[0].pose.leftWrist.y
        rightwrostx = results[0].pose.rightWrist.x
        rightwrosty = results[0].pose.rightWrist.y
    }
}

function draw() {
    image(video, 0, 0, 600, 500)
    //image(source variable,x position, y position, width, height)
    song1status = song1.isPlaying()
    song2status = song2.isPlaying()
    stroke("red")
    fill("red")
    if (lefthandscore > 0.2) {
        circle(leftwrostx, leftwrosty, 20)
        song2.stop()
        if (song1status == false) {
            song1.play()
            document.getElementById("song_name").innerHTML = "'The Nights' by Avicii is playing."

        }
    }
    if (righthandscore > 0.2) {
        circle(rightwrostx, rightwrosty, 20)
        song1.stop()
        if (song2status == false) {
            song2.play()
            document.getElementById("song_name").innerHTML = "Song 2 is playing."

        }
    }

}

function play() {
    song.play()
    song.rate(1)
    song.volume(0.5)
}