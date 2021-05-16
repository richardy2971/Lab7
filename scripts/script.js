// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
let ID = 0;
// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  window.addEventListener('load',function() {
    navigator.serviceWorker.register('./sw.js').then(function (registration) {
      console.log('Service worker registration succeeded:', registration.scope);
    }, /*catch*/ function (err) {
      console.log('Service worker registration failed:', err);
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        ID++;
        newPost.id = ID;
        newPost.addEventListener('click', () => {
          setState({ name: 'entry', id:newPost.id });
        });
        document.querySelector('main').appendChild(newPost);
      });
    });
});

let head= document.querySelector('header h1');
let setting= document.querySelector('header img')
head.addEventListener('click',() => {
  setState({name: 'HomePage'},false);
});;

setting.addEventListener('click', () => {
  setState({name: 'settings'},false);
});
window.addEventListener('popstate',(event) => {
  setState(event.state,true);
});