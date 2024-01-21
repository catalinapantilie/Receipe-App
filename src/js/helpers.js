import { TIMEOUT_SECOND } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const result = await Promise.race([fetch(url), timeout(TIMEOUT_SECOND)]);
    const data = await result.json();

    if (!result.ok) throw new Error(`${data.message} (${result.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const result = await Promise.race([fetchPro, timeout(TIMEOUT_SECOND)]);
    const data = await result.json();

    if (!result.ok) throw new Error(`${data.message} (${result.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
