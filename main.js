objects = [];
status = "";
function preload(){
    video = createVideo('https://www.youtube.com/watch?v=CAb_bCtKuXg');

}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide();
}
function draw(){
    image(video,0,0,480,380);
    if (status != ""){
        objectDetector.detect(video,gotresult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "status : objects detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :  " + objects.length;
            fill("#0000ff");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#0000ff");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function start(){
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "detecting objects";
}
function modelLoaded(){
    console.log("cocossd Model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotresult(results,error){
    if (error){
        console.log(error);
    }
    else{
        objects = results;
        console.log(results);
    }
}