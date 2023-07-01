console.log('render')

const boxes = Array.from(document.querySelectorAll('.box'))
const resetbtn = document.querySelector('#resetBtn')
const victory = document.querySelector('#victory')
const player = document.querySelector('#player')
const trun = document.querySelector('#turn')
const draw = document.querySelector('#draw')
let areas = []
const zeroTest = '0'
const closeText = 'X'
let currentPlayer = zeroTest
let victoryBoxsIds = [];
let count = 0;


const arrayFillUp = () => {
    for (let i = 0; i < 9; i++) {
        areas[i] = 0
        areas.join(areas[i])
    }
}

const hasPlayerVictory = (currentPlayer) => {
    console.log(areas, currentPlayer)
    if (areas[0] === currentPlayer) {
        if (areas[1] === currentPlayer && areas[2] === currentPlayer) {
            victoryBoxsIds = [0, 1, 2]
            return true;
        }
        if (areas[3] === currentPlayer && areas[6] === currentPlayer) {
            victoryBoxsIds = [0, 3, 6]
            return true;
        }
        if (areas[4] === currentPlayer && areas[8] === currentPlayer) {
            victoryBoxsIds = [0, 4, 8]
            return true;
        }
    }

    if (areas[4] === currentPlayer) {
        console.log('enter', currentPlayer)
        if (areas[1] === currentPlayer && areas[7] === currentPlayer) {
            victoryBoxsIds = [4, 1, 7]
            return true;
        }
        if (areas[2] === currentPlayer && areas[6] === currentPlayer) {
            victoryBoxsIds = [4, 2, 6]
            return true;
        }
        if (areas[3] === currentPlayer && areas[5] === currentPlayer) {
            victoryBoxsIds = [4, 3, 5]
            return true;
        }
    }

    if (areas[8] === currentPlayer) {
        if (areas[7] === currentPlayer && areas[6] === currentPlayer) {
            victoryBoxsIds = [8, 7, 6]
            return true;
        }
        if (areas[5] === currentPlayer && areas[2] === currentPlayer) {
            victoryBoxsIds = [8, 5, 2]
            return true;
        }
    }

    return false;

}

const changesVictoryBoxesBg = () => {
    victoryBoxsIds.forEach(id => {
        boxes[id].classList.add('border-2', 'border-green-500')
        victoryBoxsIds.join(boxes[id])
    })
}

const onBoxHanlder = (e) => {
    const id = e.target.id
    if (areas[parseInt(id)] === 0) {
        areas[parseInt(id)] = currentPlayer;
        // console.log(areas)
        e.target.innerHTML = currentPlayer;
        e.target.classList.remove('text-green-600', 'text-orange-600')
        let color = currentPlayer === '0' ? 'text-green-600' : 'text-orange-600'
        e.target.classList.add(color)
        count++
        if (hasPlayerVictory(currentPlayer)) {
            console.log('win')
            victory.classList.add('flex')
            victory.classList.remove('hidden')
            player.innerHTML = currentPlayer
            changesVictoryBoxesBg()
            return
        } else if (!hasPlayerVictory(currentPlayer) && count === 9) {
            console.log('draw held?')
            draw.classList.add('flex')
            draw.classList.remove('hidden')
        }
        trun.classList.remove('text-orange-600', 'text-green-600')
        const x = currentPlayer === zeroTest ? 'Red' : 'Green'
        trun.innerHTML = x
        trun.classList.add(x === 'Red' ? 'text-orange-600' : 'text-green-600')
        currentPlayer = currentPlayer === zeroTest ? closeText : zeroTest
        return
    }
}

const reset = () => {
    count = 0;
    boxes.forEach(box => {
        box.innerHTML = ''
        box.classList.remove('text-green-600', 'text-red-600')
        box.classList.remove('border-2', 'border-green-500')
    })
    victory.classList.add('hidden')
    victory.classList.remove('flex')
    draw.classList.add('hidden')
    draw.classList.remove('flex')
    areas = []
    for (let i = 0; i < 9; i++) {
        areas[i] = 0
        areas.join(areas[i])
    }
}

const bindClickEvent = () => {
    boxes.forEach(box => {
        box.addEventListener('click', onBoxHanlder)
    })

}
resetbtn.addEventListener('click', reset)


arrayFillUp()
bindClickEvent()