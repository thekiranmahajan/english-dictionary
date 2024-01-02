const searchBox = document.getElementById("search-box");
const instructions = document.getElementById("instructions");
const word = document.getElementById("word");
const def = document.getElementById("def");
const meaningContainer = document.getElementById("meaning-container");

const fetchWordMeaning = async (wordInput) => {
  try {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`;
    instructions.innerHTML = `Searching meaning of "${wordInput}" ...`;

    const data = await fetch(url).then((res) => res.json());
    word.innerText = data[0].word;
    def.innerText = data[0].meanings[0].definitions[0].definition;
    console.log();

    instructions.innerHTML = `Press <span class="enter-key">Enter</span> key to search meaning`;
    instructions.style.display = "none";
    meaningContainer.style.display = "block";
  } catch (error) {
    console.log("Oops!! Something went wrong...");
    instructions.style.display = "block";
    instructions.innerHTML = `Press <span class="enter-key">Enter</span> key to search meaning`;
  }
};

searchBox.addEventListener("keyup", (e) => {
  if (e.target.value !== "" && e.key === "Enter") {
    fetchWordMeaning(e.target.value);
  }
});
