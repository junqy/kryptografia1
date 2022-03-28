
function EncrytionRail(){
    let text = document.getElementById("encrypt").value.toLowerCase();
    if(text.length < 1){
        alert("enter some text!"); 
        return;
    }
    let key = parseInt(document.getElementById("key").value);
    if(key > Math.floor(2*(text.length-1))){
        alert("key is too big for text length!");
        return;
    }
    var rail = Array.from(Array(key), ()=> new Array(text.length));
    for(i=0; i< key; i++){
        for( j=0; j<text.length; j++){
            rail[i][j] = '\n'
        }
    }
    var dir_down = false  //zmienna odpowiadajaca za sprawdzanie czy mamy jeszcze wolne "szyny" idąc w dół
    let row = 0, col = 0

    for(i=0; i<text.length; i++){
        if(row == 0 || row == key-1) dir_down = !dir_down  //zmiana w zaleznosci od kierunku w dół lub w górę
        rail[row][col++]=text[i]
        dir_down?row++ : row--;
    }
    let result = "";
    for(i=0; i<key; i++){
        for(j=0; j<text.length; j++){
            if(rail[i][j]!='\n')
            result+=rail[i][j]  //przechodzimy po wszystkich znakach różnych od "\n"
            console.log(result)
        }
    }
    document.getElementById("encrypted").value = result;
}

function DecryptionRail(){
    let text = document.getElementById("encrypted").value.toLowerCase();
    let key = parseInt(document.getElementById("key").value);
    if(key > Math.floor(2*(text.length-1))){
        alert("key is too big for text length!");
        return;
    }
    var rail = Array.from(Array(key), ()=> new Array(text.length));
    for(i=0; i<key; i++){
        for(j=0; j<text.length; j++){
            rail[i][j] = '\n'
        }
    }
    var dir_down;       //zmienna odpowiadajaca za sprawdzanie czy mamy jeszcze wolne "szyny" idąc w dół
    let row = 0, col = 0
    for(i=0; i<text.length; i++){
        if(row==0) dir_down = true;
        if(row==key-1) dir_down = false;    //zmiana w zaleznosci od kierunku w dół lub w górę
        rail[row][col++] = '*'              //wypelnienie miejsc na litery znakiem "*"
        dir_down?row++ : row--;
    }
    console.log("rail1: " + rail)

    let index = 0;
    for(i=0; i<key; i++){
        for(j=0; j<text.length; j++){
            if(rail[i][j] == '*' && index<text.length){
                rail[i][j] = text[index++]  //zamiana znaku "*" na litery z zaszyfrowanego wyrazu
            }
        }
    }
    console.log("rail2: " + rail)
    let result = ""
    row = 0, col = 0
    for(i=0; i<text.length; i++){
        if(row ==0) dir_down = true
        if(row == key-1) dir_down = false
        if(rail[row][col] != '*'){
            result+=rail[row][col++]       //wypisanie odszyfrowanego tekstu
            console.log(result)
        }
        dir_down?row++ : row--
    }
    document.getElementById("encrypt").value = result;
    console.log("rail3: " + rail)
}


function CaesarEncrypt(){
    let text = document.getElementById("cencrypt").value;
    let key = parseInt(document.getElementById("key2").value);
        let result=""
        for (let i = 0; i < text.length; i++)
        {
            let char = text[i];
            if (char == char.toUpperCase())
            {
                let ch =  String.fromCharCode((char.charCodeAt(0) + key-65) % 26 + 65);     //przypadek dla duzych liter
                result += ch;
            }
            else
            {
                let ch = String.fromCharCode((char.charCodeAt(0) + key-97) % 26 + 97);      //przypadek dla malych liter
                result += ch;
            }
        }
        document.getElementById("cencrypted").value = result;
    }

function CaesarDecrypt(){
    let text = document.getElementById("cencrypted").value;
    let key = parseInt(document.getElementById("key2").value);
        let result=""
        for (let i = 0; i < text.length; i++)
        {
            let char = text[i];
            if (char == char.toUpperCase())
            {
                let ch =  String.fromCharCode((char.charCodeAt(0) + 26-key-65) % 26 + 65);      //przypadek dla duzych liter
                result += ch;
            }
            else
            {
                let ch = String.fromCharCode((char.charCodeAt(0) + 26-key-97) % 26 + 97);       //przypadek dla malych liter
                result += ch;
            }
        }
        document.getElementById("cencrypt").value = result;
    }

function genKey(){
    let vtext = document.getElementById("vencrypt").value;
    let vkey = document.getElementById("key3").value;
    let key = vkey.split("")
    console.log(key)
    if(vtext.length == key.length) return key.join("")
    else{
        let temp = key.length;
        for(i=0; i<(vtext.length-temp); i++){
            key.push(key[i % ((key).length)])       //dopisanie dodatkowych znakow do klucza, powielenie tego co jest
                                                    //np 8 znakow w tekscie, klucz = "break" ---> "breakbre"
        }
    }
    document.getElementById("key3").value = key.join("");
}

function vcipherText(){
    let vtext = document.getElementById("vencrypt").value.toUpperCase();
    let vkey = document.getElementById("key3").value.toUpperCase();
    if(vkey.length<1){
        alert("enter key!")
        return;
    }else if(vkey.length < vtext.length){
        alert("press genKey button")
        return;
    }
    let text = ""
    for(i=0; i<vtext.length; i++){
        let x = (vtext[i].charCodeAt(0) + vkey[i].charCodeAt(0)) % 26   //szukamy "przecięcia" na tablicy szyfru vigenere'a
        x+= 'A'.charCodeAt(0)
        text+=String.fromCharCode(x)
    }
    document.getElementById("vencrypted").value = text;
}

function vDecrypt(){
    let vencrypted = document.getElementById("vencrypted").value.toUpperCase();
    let vkey = document.getElementById("key3").value.toUpperCase();
    if(vkey.length<1){
        alert("enter key!")
        return;
    }
    let dectext = ""
    for(i=0; i<vencrypted.length; i++){
        let x = (vencrypted[i].charCodeAt(0) - vkey[i].charCodeAt(0) + 26) % 26
        x+= 'A'.charCodeAt(0)
        dectext+=String.fromCharCode(x)
    }
    document.getElementById("vencrypt").value = dectext;
}

function MatrixB(){
    let key = document.getElementById("key5").value;
    let sortedKey = key.split('').sort()
    let idx
    let tab = new Array(key.length)
    for(i=0; i< +key.length; i++){
        idx = key.indexOf(sortedKey[i]) 
        key = key.substring(0,idx) + " " + key.substring(idx+1);
        tab[idx] = i + 1
    }
    list = tab
    return list
}
function MatrixC(){
    let key = document.getElementById("key6").value;
    let sortedKey = key.split('').sort()
    let idx
    let tab = new Array(key.length)
    for(i=0; i< +key.length; i++){
        idx = key.indexOf(sortedKey[i]) 
        key = key.substring(0,idx) + " " + key.substring(idx+1);
        tab[idx] = i + 1
    }
    list = tab
    return list
}

function macierz_2a_deszyfr() {
    var klucz = document.getElementById("key4").value
    klucz = klucz.split('-').map(Number)
    var coded = document.getElementById("aencrypted").value
    var rkey = [];
    var decodedword = [];
    for (i = 0; i < klucz.length; i++) {
      rkey[i] = klucz[klucz.length - 1 - i];
      
    }
   
    for (let j = 0; j < coded.length; j += rkey.length) {
      rkey.forEach((e) => {
       if(decodedword.length < coded.length)
        if(e - 1 + j >= coded.length){
          decodedword += coded.charAt(coded.length -1)
          
        }
        else{
          decodedword += coded[e - 1 + j];
        }
      
      });
    }
    document.getElementById("aencrypt").value = decodedword;
  
  }
  
  
  function macierz_2a_szyfr() {
    
    var result = [];
    var słowo = document.getElementById("aencrypt").value
    var klucz = document.getElementById("key4").value
    klucz = klucz.split('-').map(Number)
    console.log("klucz " + klucz)
    for (let i = 0; i < słowo.length; i += klucz.length) {
      klucz.forEach((e) => {
        if (e - 1 + i < słowo.length) {
          result += słowo[e - 1 + i];
        }
      });
    }
    
    document.getElementById("aencrypted").value = result
  }
  
  
  
  function BEncrypt(){
      var key = document.getElementById("key5").value
      var text = document.getElementById("bencrypt").value
      MatrixB(key)
      
      let result = ""
     
   
      let x = Math.ceil(text.length/list.length)
      text = text.replace(/ +/g, "");
      
      let rows = Array.from(Array(x), () => new Array(list.length))
    
      
      let pozycja = 0
      for(let i = 0; i < x; i++  ){
        for(let j = 0; j < list.length;j++){
          if(pozycja < text.length){
          rows[i][j] = text[pozycja++]
          }
          
        }
        
      }
      
      
  
   let p = 0
     
      for(let i = 0; i <= list.length; i++ ){
        for(let j = 0; j < x;j++){
          
          
          if( !rows[j][list.indexOf(i)]){
            continue
            
          }else{
            result += rows[j][list.indexOf(i)]
          }
  
        }
        result += ' '
      }
      result = result.slice(1)
     document.getElementById("bencrypted").value = result
  }
  
  function BDecrypt(){
    let k = document.getElementById("key5").value
    let text = document.getElementById("bencrypted").value
    let key = MatrixB()
    let tab = []
    tab = text.split(' ')
    
    let x = Math.ceil(text.length/list.length)
    let result = ""
    for(let i = 0; i< x ; i++){
      for(let j = 0; j<key.length;j++){
        if(!tab[key[j] -1][i]){
          continue
        }else{
          result += tab[key[j] -1][i]
        }
      }
    }
    document.getElementById("bencrypt").value = result
  }
  
  function CEncrypt(){
      console.log("C macierz")
    let text = document.getElementById("ccencrypt").value
    let key = document.getElementById("key6").value
    let list = MatrixC()
    text = text.replace(/ +/g, "");
    let tab = []
    let count = 0
    let pozycja = list.length
    let result = ''
    
    for(let i = 0; i < pozycja;i++){
      if(count == text.length){
        break
      }else{
  
      tab[i] = ''
      for(let j = 0; j <= list.indexOf(i+1);j++){
        if(!text[count]){
          continue
        }else{
          tab[i] += text[count++]
        }
        
      }
    }
    }
  
    
    let temp =''
    for(let i = 0;i < list.length;i++){
      for(let j = 0; j < tab.length;j++){
      
        
       
          if(!tab[j][list.indexOf(i+1)]){
            continue
          }else{
            result += tab[j][list.indexOf(i+1)]
          }
        
        
      }
      result += ' '
    }
    console.log(result)
    document.getElementById("ccencrypted").value = result
  }
  
  function CDecrypt(){
    let text = document.getElementById("ccencrypted").value
    let key = document.getElementById("key6").value
    let list = MatrixC()
    let tab = new Array(list.length)
    let ln = tab.length
    let textArr = text.split(' ')
    let result = ''
    
    for(let i = 0; i < list.length;i++){
      let idx = list.indexOf(i+1)
      tab[idx] = textArr[i]
    }
   
   for(let j = 0;j <list.length;j++){
      let current = list.indexOf(j+1) + 1
      while(current > 0 ){
        for(let i = 0; i< ln;i++){
          result += tab[i][0] ?? ''
          tab[i] = tab[i].slice(1)
          current--
          if(current <= 0){
            break
          }
        }
      }
   }
    document.getElementById("ccencrypt").value = result
  }
  

  
  