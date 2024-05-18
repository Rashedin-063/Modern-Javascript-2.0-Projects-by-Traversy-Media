// method 1:
// window.addEventListener('keyup', (e) => {
//   const insert = document.getElementById('insert');

//   insert.innerHTML = `
//   <div class="key">
//        ${e.key === ' ' ? 'Space' : e.key}
//       <small>e.key</small>
//      </div>

//     <div class="key">
//       ${e.keyCode}
//       <small>e.keyCode</small>
//     </div>

//     <div class="key">
//       ${e.code}
//       <small>e.code</small>
//     </div>
//   `;
// })

// method 2:

function showKeyCodes(e) {
  const insert = document.getElementById('insert');
  insert.innerText = '';
  const keyCode = {
    'e.key': e.key === ' ' ? 'Space' : e.key,
    'e.keyCode': e.keyCode,
    'e.code' : e.code
  }
  for (key in keyCode) {
    const div = document.createElement('div');
    div.className = 'key';
    div.innerText = keyCode[key];
    const small = document.createElement('small');
    small.innerText = key;
    div.appendChild(small)
    
    insert.appendChild(div)
  }
}

window.addEventListener('keyup', showKeyCodes)