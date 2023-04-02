const body_c = document.createElement("div");
body_c.className = "container";
document.body.appendChild(body_c);



const search_area = document.createElement("div");
search_area.className = "searchArea";
body_c.appendChild(search_area);

const search_Input = document.createElement("input");
search_Input.placeholder="Search...";
search_Input.className="search_Input";
search_area.appendChild(search_Input);

const search_btn = document.createElement("button");
search_btn.className="search_btn";
search_btn.innerText="Search";
search_area.appendChild(search_btn);

const fetch_data = document.createElement("button");
fetch_data.innerText = "Fetch Data";
fetch_data.className = "fetch_btn";
body_c.appendChild(fetch_data);

let result  = document.createElement("div");
result.className="Result";
document.body.append(result);


let page = 1;
let perpage = 15;

fetch_data. addEventListener('click', async function getData(){
    try{
        let response = await fetch(`https://api.openbrewerydb.org/breweries?page=${page}&per_page=${perpage}`)
        const jsonData = await response.json();
        console.log(jsonData);

        for(let i =0;i<jsonData.length;i++){
            let Res_Data = document.createElement("div");
            Res_Data.innerHTML += 
            `
            <div class ="card">
            <div class = "card_body">
            
            <h4 class ="title">${jsonData[i].name}</h4>
            
            <p><span> Brewery Type: ${jsonData[i].brewery_type}</span></p>
            <p><span> Address: ${jsonData[i].address_1},${jsonData[i].street},${jsonData[i].city},${jsonData[i].country},
            ${jsonData[i].postal_code}</span></p>
            <p><span> Website: ${jsonData[i].website_url}</span></p>
            <p><span> Phone Number: ${jsonData[i].phone}</span></p>
            </div>
            </div>
            
            `
            result.appendChild(Res_Data);
        }

      

    }
    catch(err){
        console.log(err)
    }
});

// getData();


search_btn. addEventListener('click', async function searchData(){
    try{
        let searchTerm = document.querySelector(".search_Input").value;
        let response = await fetch(`https://api.openbrewerydb.org/breweries?page=${page}&per_page=${perpage}`)
        const jsonData = await response.json();
        console.log(jsonData);

        let arr_filtered=[];
        for(let j =0;j<jsonData.length;j++){
            if((jsonData[j].name.toLowerCase()).includes(searchTerm.toLowerCase())){
                arr_filtered.push(jsonData[j])
            }
        }

        const emptyarr=document.querySelector(".Result");
        emptyarr.innerHTML ="";

        for(let i =0;i<arr_filtered.length;i++){
            let Res_Data = document.createElement("div");
            Res_Data.innerHTML += 
            `
            <div class ="card">
            <div class = "body">
            <h3 class ="title">${arr_filtered[i].name}</h3>
            <p><span> Brewery Type: ${arr_filtered[i].brewery_type}</span></p>
            <p><span> Address: ${arr_filtered[i].address_1},${arr_filtered[i].street},${arr_filtered[i].city},
            ${arr_filtered[i].country},${arr_filtered[i].postal_code}
            </span></p>
            <p><span> Website: ${arr_filtered[i].website_url}</span></p>
            <p><span> Phone Number: ${arr_filtered[i].phone}</span></p>
            </div>
            </div>
            `
            result.appendChild(Res_Data);
        }

      

    }
    catch(err){
        console.log(err)
    }
});
// searchData();