//const CryptoJS = require("./crypto-js.min.js");

const results = [];
const dom = document.querySelector("body");

async function apimekoGames(series, games, resultIndex="champion_name") {
    
    for (const game of games) {
        const resp = await fetch(`https://${series}.apimeko.link/games/${game}/answer?utc=2`);
        if (!resp.ok) {
            console.error('internet error');
            return;
        }
    
        const encryptedData = await resp.text();
    
        const key = "QhDZJfngdx";
    
        const bytes = CryptoJS.AES.decrypt(encryptedData, key);
        const resJson = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        results.push(game + " : " + resJson[resultIndex]);
        dom.innerHTML += "<pre>" + results[results.length - 1] + "</pre>" 

        if(series == "loldle" && resJson) {
            console.log
            if(game == "ability") {
                results.push("ability letter : " + resJson.ability_letter);
                dom.innerHTML += "<pre>" + results[results.length - 1] + "</pre>" 

            }

            if(game == "splash") {
                results.push("splash name : " + resJson.splash_name);
                dom.innerHTML += "<pre>" + results[results.length - 1] + "</pre>" 

            }
        }
        
    }

}
async function allDle() {
    const currentDate = new Date();
    console.log(`Result for today : (${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()})`);
    
    let all = [
        {series : "loldle", games : ["classic", "quote", "ability", "emoji", "splash"]},
        {series : "pokedle", games : ["classic", "card", "flavor", "silhouette"]},
        {series : "dotadle", games : ["classic", "quote", "ability", "loadingscreen"]},
        {series : "smashdle", games : ["classic", "silhouette", "kirby", "finalSmash", "emoji"]},
        {series : "onepiecedle", games : ["classic", "devilFruit", "wanted", "laugh"]},
        {series : "narutodle", games : ["classic", "quote", "jutsu", "eye" ]},
    ];
    for (const element of all) {
        results.push( element.series);
        dom.innerHTML += "<h3><b><pre>" + results[results.length - 1] + "</pre></b></h3>" 

        await apimekoGames(element.series, element.games);


    }

    console.log(results);
}



allDle();