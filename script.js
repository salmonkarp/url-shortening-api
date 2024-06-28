function toggleNav() {
  console.log("toggling");
  var x = document.querySelector(".p0");
  if (x.classList.contains("responsive")) {
    x.classList.remove("responsive");
  } else {
    x.classList.add("responsive");
  }
}

async function shorten() {
  let inputText = document.querySelector(".p2-input").value;
  document.querySelector(".p2-button").innerHTML = "Loading...";
  document.querySelector(".p2-button").classList.add("loading");
  if (!inputText) {
    setInvalid();
  } else {
    fetch("https://smolurl.com/api/links", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: inputText,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("ERROR " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let resultDiv = document.createElement("div");
        resultDiv.innerHTML = `
    <div class='result'>
        <div class='result-0'>${inputText}</div>
        <hr />
        <input class='result-1' value='${data.data.short_url}' disabled></input>
        <button class='result-2' onclick="triggerCopy(this)">Copy</button>
    </div>`;
        document.querySelector(".p2-result").appendChild(resultDiv);
      })
      .catch((error) => {
        console.error("Error:", error);
        setInvalid();
      })
      .finally(() => {
        document.querySelector(".p2-input").value = "";
        document.querySelector(".p2-button").innerHTML = "Shorten it!";
        document.querySelector(".p2-button").classList.remove("loading");
      });
  }
}

function setInvalid() {
  let textInput = document.querySelector(".p2-input");
  let invalidMsg = document.querySelector(".invalid-msg");
  textInput.classList.add("invalid");
  invalidMsg.style.display = "inline";
}

function removeInvalid() {
  let textInput = document.querySelector(".p2-input");
  let invalidMsg = document.querySelector(".invalid-msg");
  textInput.classList.remove("invalid");
  invalidMsg.style.display = "none";
}

function triggerCopy(el) {
  let copyText = el.parentElement.querySelector(".result-1");
  console.log(copyText);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  el.classList.add("copied");
  el.innerHTML = "Copied!";
  el.disabled = true;
  setTimeout(() => {
    el.classList.remove("copied");
    el.innerHTML = "Copy";
    el.disabled = false;
  }, 2500);
}
