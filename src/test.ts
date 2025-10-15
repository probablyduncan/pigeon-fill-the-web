import names from "/names.json"
const runoutNames = ["Pigeon", "Pigeon", "Pigeon again", "Millionth pigeon", "Another pigeon", "Another damn pigeon", "One more pigeon", "A whole 'nother pigeon", "un-de-fined"]
const numNames = names.length

const numPigeonFiles = 4;
const recentPigeons: number[] = new Array(numPigeonFiles / 2).fill(0);
function getPigeonImgSrc() {
    while (true) {
        const candidate = Math.floor(Math.random() * numPigeonFiles + 1);
        if (!recentPigeons.includes(candidate)) {
            recentPigeons.shift();
            recentPigeons.push(candidate);
            return "/test/" + candidate + ".webp";
        }
    }
}

function getPigeonName() {
    if (names.length > 0) {
        // take from names
        return names.splice(Math.floor(Math.random() * names.length), 1)[0]
    }
    else {
        // take from extras
        return runoutNames[Math.floor(Math.random() * runoutNames.length)]
    }
}

function letFlyThePigeons() {

    const main = document.querySelector("main")!

    if (!names || !names.length || !main) {
        return
    }

    // so on mouse down we add a pigeon and label under mouse
    // if you drag, you can put space between pigeon and label
    // they spread equally out

    let inputting = false

    main.addEventListener("click", (e) => {

        if (e.target !== main) return

        if (inputting) {
            inputting = false
            return
        }

        const { width, height, left, top } = main.getBoundingClientRect()

        const pos = [
            (100 * (e.clientX - left) / width).toFixed(5) + "%",
            (100 * (e.clientY - top) / height).toFixed(5) + "%",
        ]

        const figure = document.createElement("figure")
        const caption = document.createElement("figcaption")
        const img = document.createElement("img")

        figure.classList.add("pigeon")
        figure.style.setProperty("--left", pos[0])
        figure.style.setProperty("--top", pos[1])
        figure.style.setProperty("--scale", (Math.random() + 0.75).toFixed(5))

        if (Math.random() > 0.5) {
            img.style.setProperty("--flip", "1")
        }

        img.style.setProperty("--rotate", ((Math.random() - 0.5) * 20).toFixed(5) + "deg")

        // TODO refine this
        const wonkyChance = Math.random()
        if (wonkyChance >= Math.pow(names.length / numNames, 2)) {
            caption.classList.add("wonky")
        }

        caption.style.setProperty("--top", (105 + Math.random() * 10) + "%")
        caption.style.setProperty("--left", (Math.random() > 0.5 ? 90 : 10) + (Math.random() * 10 - 5) + "%")
        caption.style.setProperty("--rotate", ((Math.random() - 0.5) * 10).toFixed(5) + "deg")


        const name = getPigeonName()
        const input = document.createElement("input")
        input.type = "text"
        input.value = name
        input.autocomplete = "off"

        input.addEventListener("blur", submitInput)
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === "Escape") {
                inputting = false
                submitInput()
            }
        })

        function submitInput() {

            input.remove()

            if (input.value.trim().length) {
                img.alt = "A pigeon named " + input.value
                caption.innerHTML = ""
                caption.innerText = input.value
            }
            else {
                img.alt = "A nameless feathered thing"
                caption.remove()
            }
        }

        caption.appendChild(input)

        const inputSizer = document.createElement("span")
        inputSizer.ariaHidden = "true"
        inputSizer.innerText = name

        input.addEventListener("input", () => {
            inputSizer.innerText = input.value.length ? input.value : " "
        })

        caption.appendChild(inputSizer)

        img.src = getPigeonImgSrc()
        img.alt = "A pigeon named " + name


        figure.appendChild(img)
        figure.appendChild(caption)

        main.appendChild(figure)

        input.focus()
        inputting = true
        // input.setSelectionRange(0, name.length)
    })

}

letFlyThePigeons()