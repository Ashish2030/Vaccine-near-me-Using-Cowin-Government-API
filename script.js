let centers = [];
const cards = document.querySelector(".cards");
const searchBtn = document.querySelector(".searchBox").querySelector("button");

let today, d, m, y;
today = new Date();
d = today.getDate();
m = today.getMonth() + 1;
y = today.getFullYear();
today = `${d}-${m}-${y}`;

function cowinData(pincode) {
  let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${today}`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      
      if(data.sessions !== []){
        data.sessions.map((e, i) => {
          let centerInfo = [
            e.name,
            e.address,
            e.vaccine,
            e.date,
            e.min_age_limit,
            e.available_capacity,
            e.block_name,
            e.district_name,
            e.slots,
          ];
          centers.push(centerInfo);
          let code = `
      <div class="card">
      <h1>
      <span class="category">Center Name - </span>
      ${centers[i][0]}
    </h1>
    <div class="innerCard">
    <h3>
    <span class="category">Center Address - </span>
    ${centers[i][1]}
  </h3>
  <h3>
    <span class="category">Vaccine Name - </span>
    ${centers[i][2]}
  </h3>
  <h3>
    <span class="category">Date Of Vaccination - </span>
    ${centers[i][3]}
  </h3>
  <h3>
    <span class="category">Minimum Age Limit - </span>
    ${centers[i][4]}
  </h3>
  <h3>
    <span class="category">Available Capacity - </span>
    ${centers[i][5]}
  </h3>
  <h3>
    <span class="category">Block Name - </span>
    ${centers[i][6]}
  </h3>
  <h3>
    <span class="category">District Name - </span>
    ${centers[i][7]}
  </h3>
  <h3>
    <span class="category">Available Slots - </span>
     ${centers[i][8].join(" | ")}
  </h3>
    </div>
    </div>`;
          cards.innerHTML += code;
        });
        // console.log(data.sessions.length);
        if(data.sessions.length === 0){
          alert("No Vaccinations Available")
        }
        centers = []
      } 


    } else{
        alert("Some error occured")
    }
  };

  xhr.send();
}

const input = document.querySelector("#input")
input.addEventListener("keypress", (e) => {
    if (e.which === 13) {
        let pincode = input.value;
        cards.innerHTML = "";
        if (pincode === "") {
            alert("Enter pincode in the search box")
        } else if (pincode !== "") {
            cowinData(pincode)
        }
}})

searchBtn.addEventListener("click",() => {
        let pincode = input.value;
        cards.innerHTML = "";
        if (pincode === "") {
            alert("Enter pincode in the search box")
        } else if (pincode !== "") {
            cowinData(pincode)
        }
})

// cowinData(110001);
// cowinData(462030);
