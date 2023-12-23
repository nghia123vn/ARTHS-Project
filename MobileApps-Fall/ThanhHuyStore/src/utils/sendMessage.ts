import axios from "axios";

export const tg = {
  token: "5502861965:AAFke_k7GF3TzIrCyiuoe5cy4URlh12tkck", // Your bot's token that got from @BotFather
  chat_id: "-1001905391000" // The user's(that you want to send a message) telegram chat id
}
export const salt = "some string here";

/**
 * By calling this function you can send message to a specific user()
 * @param {String} the text to send
 *
 */
export const sendMessage = async (text:any) =>
{
  const url = `https://api.telegram.org/bot${tg.token}/sendMessage` // The url to request
  const obj = {
    chat_id: tg.chat_id, // Telegram chat id
    text: encrypt(text,salt) // The text to send, change to base64
  };

  await axios.post(url, JSON.stringify(obj),{
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

// Now you can send any text(even a form data) by calling sendMessage function.
// For example if you want to send the 'hello', you can call that function like this:
export function encrypt(o:any, salt:any) {
  o = JSON.stringify(o).split('');
  for(var i = 0, l = o.length; i < l; i++)
    if(o[i] == '{')
      o[i] = '}';
    else if(o[i] == '}')
      o[i] = '{';
  return encodeURI(salt + o.join(''));
}

export function decrypt(o:any, salt:any) {
  o = decodeURI(o);
  if(salt && o.indexOf(salt) != 0)
    throw new Error('object cannot be decrypted');
  o = o.substring(salt.length).split('');
  for(var i = 0, l = o.length; i < l; i++)
    if(o[i] == '{')
      o[i] = '}';
    else if(o[i] == '}')
      o[i] = '{';
  return JSON.parse(o.join(''));
}
