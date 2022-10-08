// #1 Your age in days
function ageInDays() {
    let year = prompt("What year were you born?...my friend");
    let ageInDays = (2022 - year) * 365;
    let h1 = document.createElement('h1'); //create element h1 //basically it creates the HTML element specified by tagName
    h1.innerText = "You are " + ageInDays + " days old."; //Get the inner text of an element using element.innerText
    h1.setAttribute('id', 'ageInDays');// adding id to the mewly created html element using javascript ...we can even add a class name using this
    document.getElementById("flexbox-result-1").appendChild(h1); //append h1 to the element with the provided id

    // Either use innerText 
    // OR
    // let textAnswer=document.createTextNode("You are "+ageInDays+" days old.");
    // h1.appendChild(textAnswer);
}
// document.getElementById("ageInDays").addEventListener("click", ageInDays()); //another way to listen an event using addeventlistener
// instead of onclick or mousedown html attribute 
function resetContent() {
    // document.getElementById("ageInDays").innerHTML="";
    document.getElementById("ageInDays").remove();
}


// #2 Cat generator
function generateCat() {
    let image = document.createElement('img');
    image.setAttribute('src', 'images/img-1.jpg');
    // image.src="images/img-1.jpg"
    document.getElementById("flexbox-result-2").appendChild(image);
}


// #3 rps
function rpsGame(yourChoice) {
    console.log(yourChoice);
    let humanChoice, botChoice;
    humanChoice = yourChoice.id; //would choose either rock or paper or scissor...which can be fetched from its id(bezoz we have access to objects)
    botChoice = randomChoice();
    console.log(botChoice);
    let result = decideWinner(humanChoice, botChoice); //would return an array like [0, 1] if bot wins or [0.5, 0.5] if there is a tie
    console.log(result);
    let finalMessage = messageObject(result); //message will be a dictionary as in python (object in js) {'message':"You won", 'color':"green"}
    console.log(finalMessage);
    rpsFrontend(humanChoice, botChoice, finalMessage);
}

function randomChoice() { //can also break this function into two functions to focus on functional programming...
    // ...its helpful becoz then you would know easily which function is not working
    let myArray = [
        "rock",
        "paper",
        "scissors",
    ];
    //e.g. 0.9*3=2.7 => floor=2
    // Math.random() returns a random number between 0 (inclusive),  and 1 (exclusive)
    // multiplying it with length generates a random integer less than length of the array
    // e.g. random() will give value 0.9 and if we multiply by 10 we would always get a random integer less than 10
    return myArray[Math.floor(Math.random() * myArray.length)];
}

// function decideWinner(humanChoice, botChoice){
//     // The toUpperCase() method can be used to avoid case sensitivity
//     if(humanChoice==botChoice){
//         return [0.5, 0.5]; //can directly return an array
//     }
//     else if((humanChoice=="rock" && botChoice=="scissors") || (humanChoice=="paper" && botChoice=="rock") || (humanChoice=="scissors" && botChoice=="paper")){
//         return [1, 0];
//     }
//     else{
//         return [0, 1];
//     }
// }

// # More cleaner and organised way to decide winner **:
function decideWinner(yourChoice, computerChoice) {
    let rpsDatabase = {
        'rock': { 'rock': 0.5, 'paper': 0, 'scissors': 1 },//if somebody(computer pick scissors rock will win and hence 1)
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
        'scissors': { 'rock': 0, 'paper': 1, 'scissors': 0.5 },
    }; //instead of writing so many if then condns we can create a database
    var yourScore = rpsDatabase[yourChoice][computerChoice]; //syntax for accessing the property of an object: objectName[expression]
    var computerScore = rpsDatabase[computerChoice][yourChoice];
    return [yourScore, computerScore];
}

// function finalMessage(result){
//     const displayMessage=new Object();
//     if(result[0]==result[1]){
//         displayMessage.message="You tied"
//         displayMessage.color="blue"
//     }
//     else if(result[0]>result[1]){
//         displayMessage.message="You won";
//         displayMessage.color="green"
//     }
//     else{
//         displayMessage.message="You lost";
//         displayMessage.color="red";
//     }
//     return displayMessage;
// }
// # Alternative(better way):
function messageObject([yourScore, computerScore]) {
    if (yourScore === 0) { //=== is strictly equal
        return { "message": "You lost!", "color": "red" };
    }
    if (yourScore === 0.5) {
        return { "message": "You tied!", "color": "yellow" };
    }
    else {
        return { "message": "You won!", "color": "green" };
    }
}

function rpsFrontend(humanImageChoice, botImageChoice, finalMessage) {
    // Creating images database so as to access them easily later on
    var imagesDatabase = {
        'rock': document.getElementById("rock").src,
        'paper': document.getElementById("paper").src,
        'scissors': document.getElementById("scissors").src,
    };

    // as soon as somebody made the choice, all the images will get removed
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    // creating 3 separate divs for displaying the frontend 
    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');

    // writing the inner html for each div
    // HUMANDIV:
    let colorDatabase = {
        'green': {colorHumanDiv:'green', colorBotDiv:'red'},
        'red': {colorHumanDiv:'red', colorBotDiv:'green'},
        'yellow': {colorHumanDiv:'yellow', colorBotDiv:'yellow'},
    };
    // console.log(colorDatabase[finalMessage.color]["colorHumanDiv"]); //The expression must evaluate to a property name.
    // // if we do not write colorHumanDiv with semicolon then it will that it is not defined
    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' width=175 height=175 style= 'box-shadow: 0px 1px 16px "+ colorDatabase[finalMessage.color]["colorHumanDiv"] +";' >";
    document.getElementById('flexbox-rps').appendChild(humanDiv);
    // humanDiv.setAttribute('id', 'humanImgChoice'); 
    // document.getElementById("humanImgChoice").style.boxShadow = "0px 1px 16px green";
    
    // MESSAGE:
    // // now comes the message div and we know that message is an object
    // let msg=document.createElement("h1"); //creating an element of tag h1
    // msg.innerHTML=finalMessage.message; //setting its inner html
    // document.getElementById('flexbox-rps').appendChild(msg); //and finally appending the newly created element to the parent tag
    // // To change the style of an HTML element, use this syntax:
    // // document.getElementById(id).style.property = new style
    // msg.setAttribute('id', 'msgColor'); //first giving the msg element an id 
    // document.getElementById("msgColor").style.color=finalMessage.color;
    messageDiv.innerHTML="<h1 style='color: "+finalMessage.color+"; padding: 30px; font-size:60px;'>"+finalMessage.message+"</h1>";
    document.getElementById('flexbox-rps').appendChild(messageDiv);


    // BOTDIV:
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' width=175 height=175 style= 'box-shadow: 0px 1px 16px "+ colorDatabase[finalMessage.color]["colorBotDiv"] +";' >";
    document.getElementById('flexbox-rps').appendChild(botDiv);
}


// #4 Change the color of all buttons:
let all_buttons=document.getElementsByTagName("button");
console.log(all_buttons);

let copy=[];
Array.from(all_buttons).forEach(function (element) {
    
});
for (let i = 0; i < all_buttons.length; i++) {
    console.log("hello");
    copy.push(all_buttons[i].classList[1]);
}
console.log(copy);
