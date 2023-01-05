objects = [];
status = "";
input = "";


function preload(){
 
}


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  
}

function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  input = document.getElementById("input").value;

}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
           r = 255;
           g = 0;
           b = 0;

        objectDetector.detect(video, gotResult);
        
       for(i = 0; i < objects.length; i++ )
        {

       fill(r,g,b);

       document.getElementById("number_of_objects").innerHTML = "Number of objects detected are " + objects.length; 
       document.getElementById("status").innerHTML = "Objects Detected";

       percent = floor(objects[i].confidence.toFixed(3) * 100);
       text(objects[i].label + "" + percent + "" +  "%", objects[i].x + 15, objects[i].y + 15, );
       noFill();
       stroke(r,g,b);
       
       rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

     if(objects[i].label == input ) 
     {
      document.getElementById("answer").innerHTML = objects[i].label  + "  " + " Is    Detected " ;

      synth = window.speechSynthesis;
      speak_data = objects[i].label  + "" + "Is Detected ";
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);

     }
       }
      }
}