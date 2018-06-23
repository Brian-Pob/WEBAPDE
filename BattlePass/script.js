function calculateStars(curTier, curStars, goalTier) {
    if (curTier < 0 || curTier > 100 || curStars > 9 || curStars < 0 ||goalTier <curTier ||goalTier > 100)
        return "error";

    return (goalTier - curTier) * 10 - curStars;
}

function displayResult() {
    document.getElementById("result").innerHTML = "Hello";
}
