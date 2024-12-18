
const dom = document.querySelector("body");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function getWordsForNextDays(daysCount) {
    
    const url = 'https://api.allorigins.win/raw?url=https://www.nytimes.com/svc/wordle/v2/';//+ data + '.json'
    const today = new Date();
    const results = [];
    for (let i = 0; i < daysCount; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        const formatedDate = `${currentDate.getFullYear()}`.padStart(2,0) + '-' + `${currentDate.getMonth() + 1}`.padStart(2,0) + '-' + `${currentDate.getDate()}`.padStart(2,0);
        const defaultSolution = {print_date : formatedDate, solution : "not found"};
        let data = defaultSolution;
        try {
            const response = await fetch(url + formatedDate + '.json');
            
            if (!response.ok) {
              i = daysCount;
              throw new Error(response.statusText);
            }
        
            const respdata = await response.json();
            if(respdata.solution)
                data = respdata;
        } catch (error) {
            console.error(error, "probably not set by the NYT");
        }
        await sleep(500);
        results.push(data);
        dom.innerHTML += `<pre>Date : ${results[results.length - 1].print_date}, Word : ${results[results.length - 1].solution}</pre>`
        
    }

    return results;
}
/*
const args = process.argv.slice(2);

if (args.length < 1 || isNaN(parseInt(args[0]))) {
    console.error("Add a number greater than 1 as an argument to generate words for multiple days.");
    args[0] = 1;
}
*/
const args = ['30']; 
const daysCount = parseInt(args[0], 10);

getWordsForNextDays(daysCount).then((results) => {
    results.forEach((entry) => {
        console.log(`Date : ${entry.print_date}, Word : ${entry.solution}`);
    });
});