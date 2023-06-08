/**
 * Creates a link tag for a resource.
 * @param {string} rel stylesheet, icon, etc.
 * @param {string} href path to the resource
 * @returns {HTMLLinkElement} the link tag
 */
function linkTag(rel, href) {
  var link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  return link;
}


/**
 * Fetches a file from the server.
 * @param {string} url the url of the file to fetch
 * @returns {Promise<string>} the contents of the file
 */
async function fetchFile(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status == 200) resolve(xhr.responseText);
      else reject(new Error(xhr.statusText));
    };
    xhr.onerror = () => reject(new Error('Network Error'));
    xhr.send();
  });
}


/**
 * Main function.
 */
async function main() {
  var head = document.head;
  var body = document.body;
  head.appendChild(linkTag('stylesheet', chrome.runtime.getURL('stickers/cat-peel-moddar.css')));
  var newSabine = await fetchFile(chrome.runtime.getURL('stickers/cat-peel-moddar.html'));
  var div  = document.createElement('div');
  div.id   = 'cat-peel-moddar';
  div.className = 'sticker';
  div.innerHTML = newSabine;
  body.appendChild(div);
}
main();
