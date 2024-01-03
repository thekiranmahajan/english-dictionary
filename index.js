const searchBox = document.getElementById("search-box");
const instructions = document.getElementById("instructions");
const word = document.getElementById("word");
const def = document.getElementById("def");
const meaningContainer = document.getElementById("meaning-container");
const speakerIcon = document.getElementById("speakerIcon");
const pronunciation = document.getElementById("audio");

const fetchWordMeaning = async (wordInput) => {
  try {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`;
    instructions.innerHTML = `Searching meaning of "${wordInput}" ...`;

    const data = await fetch(url).then((res) => res.json());
    if (data.title) {
      instructions.style.display = "block";
      meaningContainer.style.display = "none";
      instructions.innerHTML = `Word is not available in dictionary. <br/>Type another word and press <span class="enter-key">Enter</span> key to search meaning`;
      speakerIcon.style.display = "none";
    } else {
      word.innerText = data[0].word;
      def.innerText = data[0].meanings[0].definitions[0].definition;

      // if (data[0].phonetics[0].audio) {
      //   pronunciation.src = data[0].phonetics[0].audio;
      // } else if (data[0].phonetics[0].audio === "") {
      //   pronunciation.src = data[0].phonetics[1]?.audio;
      // } else if (data[0].phonetics[1]?.audio === "") {
      //   pronunciation.src = data[0].phonetics[2]?.audio;
      // } else {
      //   console.log("no audio");
      // }
      console.log(data[0]);
      const phonetics = data[0].phonetics;
      let audioIndex = 0;

      while (audioIndex < phonetics.length && !phonetics[audioIndex].audio) {
        audioIndex++;
      }

      if (audioIndex < phonetics.length) {
        pronunciation.src = phonetics[audioIndex].audio;
        speakerIcon.style.display = "block";
        speakerIcon.addEventListener("click", () => {
          pronunciation.play();
        });
      } else {
        console.log("No audio available");
        speakerIcon.style.display = "none";
      }

      instructions.innerHTML = `Press <span class="enter-key">Enter</span> key to search meaning`;
      instructions.style.display = "none";
      meaningContainer.style.display = "block";
    }
  } catch (error) {
    console.log("Oops!! Something went wrong...", error);
    speakerIcon.style.display = "none";
    meaningContainer.style.display = "none";
    instructions.style.display = "block";
    instructions.innerHTML = `Oops!! Something went wrong... <br/> Press <span class="enter-key">Enter</span> key to search meaning`;
  }
};

searchBox.addEventListener("keyup", (e) => {
  if (e.target.value !== "" && e.key === "Enter") {
    fetchWordMeaning(e.target.value);
  }
});
