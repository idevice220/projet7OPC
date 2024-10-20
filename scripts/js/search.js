const buttonSvg = document.getElementById("svg");
const searchInput = document.getElementById("searchInput");


buttonSvg.addEventListener('click', () => {
    event.preventDefault();
    const search = document.getElementById("searchInput").value;
    console.log(search);
});



