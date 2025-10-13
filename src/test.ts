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

        if (distanceX > lastDropSize[0] || distanceY > lastDropSize[1] * 2) {
            lastDropPos = currentPos
            const els = createLabel(...currentPos)
            main!.appendChild(els.label)
            main!.appendChild(els.img)
            lastDropSize = [els.label.clientWidth, els.label.clientHeight].map(size => size * (Math.random() * 1 + 1)) as [number, number]
        }
    }

    function stopPlacingLabels() {
        canPlaceLabel = false
        lastDropPos = [-999, -999]
    }

    function createLabel(clientX: number, clientY: number): { label: HTMLDivElement, img: HTMLImageElement } {
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

        const img = document.createElement("img");
        img.src = getPigeonImgSrc();
        img.style.width = "40px";
        img.alt = label.innerText;

        return {
            label, img
        }
    }

    function onClickLabel(event: MouseEvent, _label: HTMLDivElement) {
        event.stopPropagation()
    }

    function onMouseDownLabel(event: MouseEvent, _label: HTMLDivElement) {
        event.stopPropagation()
    }

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
}



initTest()




function letFlyThePigeons() {

    const main = document.querySelector("main")!

    if (!names || !names.length || !main) {
        return
    }



}