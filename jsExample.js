const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        
  //       Swal.fire({
  // position: 'center',
  // icon: 'warning',
  // title: `à¸«à¸¡à¸”à¹€à¸§à¸¥à¸² !`,
  // text:`${correctWord.toUpperCase()} à¸„à¸·à¸­à¸„à¸³à¸•à¸­à¸šà¸‚à¹‰à¸­à¸™à¸µà¹‰à¸„à¸£à¸±à¸š`,
  // showConfirmButton: false,
  // timer: 1500});
    
        initGame();
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if(!userWord) return Swal.fire({
  position: 'center',
  icon: 'warning',
  title: "à¸à¸£à¸¸à¸“à¸²à¸à¸£à¸­à¸à¸„à¸³à¸•à¸­à¸šà¸”à¹‰à¸§à¸¢à¸„à¸£à¸±à¸š !"});
    if(userWord !== correctWord) return Swal.fire({
  position: 'center',
  icon: 'error',
  title: `à¹€à¸ªà¸µà¸¢à¹ƒà¸ˆà¸”à¹‰à¸§à¸¢ !`,
  text:`${userWord} à¹€à¸›à¹‡à¸™à¸„à¸³à¸•à¸­à¸šà¸—à¸µà¹ˆà¸œà¸´à¸”à¸„à¸£à¸±à¸š`,
  showConfirmButton: false,
  timer: 1500});
    Swal.fire({
  position: 'center',
  icon: 'success',
  title: `à¸¢à¸´à¸™à¸”à¸µà¸”à¹‰à¸§à¸¢ ! `,
  text:`${correctWord.toUpperCase()} à¸„à¸·à¸­à¸„à¸³à¸—à¸µà¹ˆà¸–à¸¹à¸à¸•à¹‰à¸­à¸‡à¸„à¸£à¸±à¸š`,
  showConfirmButton: false,
  timer: 1500});
    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
