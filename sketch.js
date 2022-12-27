// simple wolfram ca non opp 
// adapted from Shiffman's Nature of Code
// display cells
// copying one array to the other creates problems if you just assign it you need to deep copy i am useing p5.js arrayCopy(sorce,destination) built in pred


let cells = [];

let newCells = []; // new array to put the new state in. but in need zero index and 19 index so i just copied it over

let generation = 0; // oh damn this is global too !!!!

//let ruleset = [0, 0, 0, 1, 1, 1, 1, 0]; 
//let ruleset = [0,1,1,0,1,1,1,0];
//let ruleset = [0, 0, 0, 1, 1, 1, 1, 0,0, 1, 0, 1, 1, 0, 1, 0]
//let ruleset = [0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0]
//let ruleset = [1,0,1,0,0,0,0,1,0,0,0,1,1,1,1,0]
let ruleset;
let cellw = 5; // cell size
let para; // for output
let myinput;
let box;
let inbutton;
let clrButton;



// makes a big difference if the cells length is even or odd
function setup() {
  
  noStroke();
  //para = createP(ruleset);
  myinput = select('#input');
  myinput.changed(setBinRule);
  inbutton = select('#btn')
  inbutton.mouseClicked(rndBinRule)
  clrButton = select('#rst')
  clrButton.mouseClicked(resetIt)
  //box = createCheckbox("multi rnd seeds", true)
  box = select('#rndbox')
  print("bing",box.checked())
  setBinRule()
  createCanvas(1000, windowHeight);
  background(255,255,0);
  print(ruleset)
  resetIt();
}

function setBinRule(){
  
 let a = int(myinput.value());
 ruleset = binConvert(a,7);
 print("ruleset",ruleset)

}

function rndBinRule(){
  let randDec = floor(random(0,2187))
  print("Decimal: ", randDec)
  myinput.value(randDec)
  ruleset= binConvert(randDec,7)
  print("ruleset", ruleset)

}

function resetIt(){
  // resets the screen with random seeds and generation
  generation = 0;
  background(255,255,0);
  for (let i=0; i < 200; i++){
    if(box.checked()){
    cells[i] = floor(random(2)); // or random
    } else{
      cells[i] = 0; // set all to zero except the middle
    }
    }
    console.log(cells.length);
    cells[int(cells.length/2)] = 1;  // you have to use int here or it wont give an int with some screen sizes and you will not have a 1 
    arrayCopy(cells,newCells);  // so the arrarys have a first and last element index as they are skiped when creating next generation

}


function draw() {
  displayCells(generation);
  if (mouseIsPressed) {
    getNextGen();
    generation++;
    //console.log(generation);
    displayCells(generation);
    if (generation*cellw > height){
      //background(255);
      generation=0;
    }
    
  }

}


function displayCells(generation) {


  for (let i = 0; i < cells.length; i++) {
    if (cells[i] == 0) {
      //console.log("white");
      fill(255,255,0);
    } else if(cells[i]== 1) {
      fill(127);
      // grey
      //console.log("black");
    } else{
      fill(0);
      //black
    }
    strokeWeight(0.5);
    //stroke(200);
    //noStroke();
    rect(i * cellw, generation * cellw, cellw, cellw);
  }

}


function getNextGen() {
  for (let i = 0; i < cells.length ; i++) { // handel edges on a torus
    
    let a = cells[(i - 1 + cells.length)%cells.length];
    let b = cells[i];
    let c = cells[(i + 1 + cells.length)%cells.length];
     
    let newState = rules(a, b, c);
    newCells[i] = newState;
    print(a,b,c,"newstate",newState)
  }
  arrayCopy(newCells,cells);  //  source then destination this 
}


function rules(a, b, c) {
  // update the rule

  if (a+b+c == 6) return ruleset[0];  // position 6 is index zero in array so the trinary number is readable as the rule 
  else if (a+b+c == 5) return ruleset[1];
  else if (a+b+c ==4) return ruleset[2];
  else if (a+b+c ==3) return ruleset[3];
  else if (a+b+c ==2) return ruleset[4];
  else if (a+b+c ==1) return ruleset[5];
  else if (a+b+c ==0) return ruleset[6];
   
}



function binConvert(a, bitLen) {
  // takes in a decimal and a bit length and returns a list of ones and zeros binary for that number

  let b = a.toString(3); // converts it to binary but leading zeros, not 8 bits eg. 3 = "11"
  let mask = "0".repeat(bitLen); // a mask to get the extra zeros
  let c = mask.slice(0, bitLen - b.length); // slice to get the right number of zeros
  // eg. if b = "11" then c = "000000"
  let binstring = c + b; // binary string so 3 will give 00000011 8 bits

  let binArray = int(binstring.split("")); // is an aray of ints so [0,0,0,0,0,0,1,1]
  return binArray;
}