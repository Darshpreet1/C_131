function setup() {
  canvas = createCanvas(225, 225);
  canvas.position(550,350);
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modalLoaded)
}

privious_results = "";

function modalLoaded(){
  console.log("Modal loded!")
}

function draw(){
  image(video,0,0,225,225);
  classifier.classify(video,gotResultes);
}

function gotResultes(error, results){
  if(error){
    console.log(error);
  }
  else{
  console.log(results);
  if((results[0].confidence > 0.5) && (privious_results != results[0].label)){
    privious_results = results[0].label;
    synth = window.speechSynthesis;
    speak_data = "Object dedected is "+results[0].label;
    utterthis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);

    document.getElementById("object").innerHTML = results[0].label;
    document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(3);
  }
  }
}


