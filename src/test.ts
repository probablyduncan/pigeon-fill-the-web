import names from "/names.json"
const runoutNames = ["Pigeon", "Pigeon", "Pigeon again", "Millionth pigeon", "Another pigeon", "Another damn pigeon", "One more pigeon", "A whole 'nother pigeon", "un-de-fined"]

async function initTest() {

    const main = document.querySelector("main")!

    if (!names || !names.length || !main) {
        return
    }

    let canPlaceLabel = false
    let lastDropPos: [number, number] = [-999, -999]
    let lastDropSize: [number, number] = [0, 0]


    main.addEventListener("mousedown", () => {
        canPlaceLabel = true
    })

    main.addEventListener("mousemove", tryPlaceLabel)

    window.addEventListener("mouseup", e => {
        tryPlaceLabel(e)
        stopPlacingLabels()
    })

    window.addEventListener("mouseleave", stopPlacingLabels)

    function tryPlaceLabel(e: { clientX: number, clientY: number }) {
        if (!canPlaceLabel) return
        const currentPos: [number, number] = [e.clientX, e.clientY]

        const distanceX = Math.abs(currentPos[0] - lastDropPos[0]);
        const distanceY = Math.abs(currentPos[1] - lastDropPos[1]);

        console.log(distanceX, distanceY, currentPos, lastDropPos)

        if (distanceX > lastDropSize[0] || distanceY > lastDropSize[1] * 2) {
            lastDropPos = currentPos
            const label = createLabel(...currentPos)
            main!.appendChild(label)
            lastDropSize = [label.clientWidth, label.clientHeight].map(size => size * (Math.random() * 1 + 1)) as [number, number]
        }
    }

    function stopPlacingLabels() {
        canPlaceLabel = false
        lastDropPos = [-999, -999]
    }

    function createLabel(clientX: number, clientY: number): HTMLDivElement {
        const label = document.createElement("div")

        label.classList.add("label")

        const { width, height, left, top } = main.getBoundingClientRect()
        const leftInterpolation = (clientX - left) / width
        const topInterpolation = (clientY - top) / height

        label.style.setProperty("--top", (100 * topInterpolation).toFixed(5) + "%")
        label.style.setProperty("--left", (100 * leftInterpolation).toFixed(5) + "%")
        label.style.setProperty("--rotate", (Math.random() * 4 - 2).toFixed(5) + "deg")

        if (names.length > 0) {
            // take from names
            label.innerText = names.splice(Math.floor(Math.random() * names.length), 1)[0]
        }
        else {
            // take from extras
            label.innerText = runoutNames[Math.floor(Math.random() * runoutNames.length)]
        }


        label.addEventListener("click", e => onClickLabel(e, label))
        label.addEventListener("mousedown", e => onMouseDownLabel(e, label))

        return label
    }

    function onClickLabel(event: MouseEvent, _label: HTMLDivElement) {
        event.stopPropagation()
    }

    function onMouseDownLabel(event: MouseEvent, _label: HTMLDivElement) {
        event.stopPropagation()
    }
}



initTest()