const buttonSvg = document.getElementById("svg");

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const search = document.getElementById("searchInput").value;
        console.log("bfdbdf" + search);
    }
}
);


buttonSvg.addEventListener('click', () => {
    event.preventDefault();
    const search = document.getElementById("searchInput").value;
    console.log("bfdbdf" + search);
});