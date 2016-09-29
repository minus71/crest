module.exports = function() {  
    var element = document.createElement('h1');
    element.innerHTML = "CREST";
    element.className = 'pure-button';
    element.setAttribute("data-version","2");
    return element;
};