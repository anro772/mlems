document.addEventListener('DOMContentLoaded', function () {
    const title = document.getElementById('title');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const catArea = document.getElementById('cat-area');
    const catCounter = document.getElementById('cat-counter');
    const countSpan = document.getElementById('count');
    const message = document.getElementById('message');
    const finalMessageYes = document.getElementById('final-message-yes');
    const finalMessageNo = document.getElementById('final-message-no');
    const mainCat = document.getElementById('main-cat');

    let catCount = 1;
    const maxCats = 10;
    let idleTimer = null;
    const idleTime = 8000;


    const positions = [
        { top: '15%', left: '65%' },
        { top: '60%', left: '25%' },
        { top: '10%', left: '15%' },
        { top: '45%', left: '70%' },
        { top: '70%', left: '60%' },
        { top: '30%', left: '10%' },
        { top: '75%', left: '35%' },
        { top: '25%', left: '40%' },
        { top: '55%', left: '5%' },
        { top: '5%', left: '45%' }
    ];

    const rotations = [-10, -5, 0, 5, 10, -8, 8, -12, 12, 0];

    yesBtn.addEventListener('click', handleYesClick);
    noBtn.addEventListener('click', handleNoClick);

    mainCat.addEventListener('mouseover', function () {
        this.style.transform = 'scale(1.05)';
    });

    mainCat.addEventListener('mouseout', function () {
        this.style.transform = 'scale(1)';
    });

    function handleYesClick() {
        if (catCount === 1) {
            message.classList.remove('hidden');

            catCounter.classList.remove('hidden');

            yesBtn.textContent = 'Inca?';
        }

        if (catCount < maxCats) {
            addCat();

            if (navigator.vibrate) {
                navigator.vibrate(50);
            }

            resetIdleTimer();
        }

        if (catCount >= maxCats) {
            finalMessageYes.classList.remove('hidden');
            yesBtn.classList.add('hidden');
            noBtn.classList.add('hidden');
        }
    }

    function handleNoClick() {
        finalMessageNo.classList.remove('hidden');

        yesBtn.classList.add('hidden');
        noBtn.classList.add('hidden');

        title.textContent = 'yay!';

        if (idleTimer) {
            clearTimeout(idleTimer);
            idleTimer = null;
        }
    }

    function addCat() {
        catCount++;
        countSpan.textContent = catCount;

        const cat = document.createElement('img');
        cat.src = `assets/cat${catCount}.jpg`;
        cat.alt = 'Pisica ' + catCount;
        cat.className = 'cat';

        const position = positions[catCount - 2];
        cat.style.top = position.top;
        cat.style.left = position.left;

        cat.style.transform = `rotate(${rotations[catCount - 2]}deg)`;

        catArea.appendChild(cat);

        if (catCount >= maxCats) {
            finalMessageYes.classList.remove('hidden');
            yesBtn.classList.add('hidden');
            noBtn.classList.add('hidden');
        }
    }

    function resetIdleTimer() {
        if (idleTimer) {
            clearTimeout(idleTimer);
            idleTimer = null;
        }

        if (catCount < maxCats) {
            idleTimer = setTimeout(function () {
                if (catCount < maxCats) {
                    addCat();

                    if (navigator.vibrate) {
                        navigator.vibrate(50);
                    }

                    resetIdleTimer();
                }
            }, idleTime);
        }
    }

    resetIdleTimer();
});