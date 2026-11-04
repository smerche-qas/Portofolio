function showContent(id){
    let pages = document.getElementsByClassName("contentPage");

    for(let i = 0; i < pages.length; i++){
        pages[i].style.display = "none";
    }

    document.getElementById(id).style.display = "block";
}