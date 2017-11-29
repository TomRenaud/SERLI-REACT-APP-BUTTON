export function fetchSounds(){
  const url = `/api/sounds`;
  console.debug(`GET ${url}`);
  return fetch(url).then(r => r.json());
}

export function fetchButtons(){
  const url = `/api/buttons`;
  console.debug(`GET ${url}`);
  return fetch(url).then(r => r.json());
}

export function addButton(button){
  const url = `/api/buttons`;
  console.log(`POST ${url}`);
  return fetch(url, {
    method: 'POST',
    // credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'tag': button.tag,
      'action': button.action,
      'sound': button.sound,
      'value': button.value,
      'status': button.status,
      'icon': button.icon,
      'img': button.img
    }),
  });
}

export function deleteButton(buttonTagId){
  const url = `/api/buttons/${buttonTagId}`;
  console.debug(`DELETE ${url}`);
  return fetch(url, {
    method: 'DELETE',
    // credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export function updateButton(tag,button){
  const url = `/api/buttons/${tag}`;
  console.debug(`PUT ${url}`);
  return fetch(url, {
    method: 'PUT',
    // credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'tag': button.tag,
      'action': button.action,
      'sound': button.sound,
      'value': button.value,
      'status': button.status,
      'icon': button.icon,
      'img': button.img
    }),
  });
}
