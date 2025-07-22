const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button');

//set value
let timer;
let maxTime= 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake =0;
let isTyping = false;


function loadParagraph(){
    const paragraph=  [
        "Paragraph 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Paragraph 2: Vivamus lacinia odio vitae vestibulum vestibulum.",
        "Paragraph 3: Cras placerat ultricies tortor, eget tincidunt ligula.",
        "Paragraph 4: Fusce nec justo vitae elit cursus luctus.",
        "Paragraph 5: Donec fermentum quam ac nisi tincidunt, at porta nulla tincidunt.",
        "Paragraph 6: Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
        "Paragraph 7: Aenean commodo ligula eget dolor. Aenean massa.",
        "Paragraph 8: Curabitur ullamcorper ultricies nisi. Nam eget dui.",
        "Paragraph 9: Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus.",
        "Paragraph 10: Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.",
        "Paragraph 11: Duis leo. Sed fringilla mauris sit amet nibh.",
        "Paragraph 12: Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales.",
        "Paragraph 13: Pellentesque habitant morbi tristique senectus et netus et malesuada.",
        "Paragraph 14: Phasellus viverra nulla ut metus varius laoreet.",
        "Paragraph 15: Quisque rutrum. Aenean imperdiet.",
        "Paragraph 16: Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.",
        "Paragraph 17: Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.",
        "Paragraph 18: Maecenas nec odio et ante tincidunt tempus.",
        "Paragraph 19: Donec vitae sapien ut libero venenatis faucibus.",
        "Paragraph 20: Nullam dictum felis eu pede mollis pretium."
    ];

const randomIndex = Math.floor(Math.random()*paragraph.length);
typingText.innerHTML='';
for(const char of paragraph[randomIndex]){
console.log(char);
typingText.innerHTML+= `<span>${char}</span>`;
}
typingText.querySelectorAll('span')[0].classList.add('active');
document.addEventListener('keydown',()=>input.focus());
typingText.addEventListener("click",()=>{
    input.focus()})
}

//Handle user input
function initTyping(){
    const char= typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft >0){

        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping=true;
        }

        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
            console.log("correct");
        }
        else{
            mistake++ ;
            char[charIndex].classList.add('incorrect');
            console.log("incorrect");
        }
        charIndex++;
        char[charIndex].classList.add('active');

        mistakes.innerText = mistake;
        cpm.innerText = charIndex- mistake;
    }
    else{
clearInterval(timer);
input.value='';
    }
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5) /(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText= timeLeft;
    input.value='';
    charIndex = 0;
    mistake =0;
    isTyping = false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}


input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadParagraph();