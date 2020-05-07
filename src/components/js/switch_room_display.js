function switchDisplay() {
    var cont = document.getElementById('stream-container');
    var classes = cont.classList;
    
    if (classes.contains('config-one')) {
        classes.add('config-two');
        classes.remove('config-one');
    }
    else if (classes.contains('config-two')) {
        classes.add('config-three');
        classes.remove('config-two');
    }
    else if (classes.contains('config-three')) {
        classes.add('config-four');
        classes.remove('config-three');
    }
    else if (classes.contains('config-four')) {
        classes.add('config-one');
        classes.remove('config-four');
    }
}