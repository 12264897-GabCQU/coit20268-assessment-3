fetch('nav.html')
.then(res => res.text())
.then(text => {
    document.getElementById('nav-placeholder').innerHTML = text;
})