const ErrorQty = document.getElementById("ErrorQty")
const total_price = document.getElementById("total_price")
const Qty = document.getElementById("Qty")
const btnbook = document.getElementById("btnbook")
btnbook.disabled = true
const ErrorName = document.getElementById("ErrorName")
ErrorName.innerText = ""
Qty.addEventListener("input",calcPrice)
btnbook.addEventListener("click",validate)
let price = document.getElementById("price")
let flight_Name = document.getElementById("flight_Name")
const curFlight = localStorage.getItem("FLIGHT_ID")

let departure_date
const flightData = []
async function fetchData(){
    data = await fetch("/data.json")
    data = await data.json()
    const flights = data.flights
    flights.forEach((element) => {
        if(curFlight == element.flightID){
            flightData.push(element.departureDate)
            document.getElementById("price").innerText = element.price
            document.getElementById("flight_Name").innerText = element.name
        }
    });
}
fetchData()

console.log("-->",flightData);
function calcPrice(){
    ErrorQty.innerText = ""
    const person = parseInt(document.getElementById("Qty").value)
    validatePersonQty(person)
    let totalPrice = person * parseInt(document.getElementById("price").innerText)
    let totalTax = totalPrice / 10
    total_price.value = totalPrice + totalTax
}

function validatePersonQty(person){
    if(isNaN(person)){
        ErrorQty.innerText = "Only Number Required"
        total_price.value = 0
        btnbook.disabled = true
        return
    }
    else if(person <= 0 || person > 10){
        ErrorQty.innerText = "No of person can not be more than 10 and less or equal to zero"
        total_price.value = 0
        btnbook.disabled = true
        return
    }
    else{
        btnbook.disabled = false
    }
}
async function validate(){
    const name = document.getElementById("Name").value
    if(!name){
        ErrorName.innerText = "Name can not be blank"
        return
    }
    else if(name.length <= 4){
        ErrorName.innerText = "Minumum 4 character required"
        return
    }
    else {
        const pervPnr = localStorage.getItem("PNR_NO")
        const curPnr = generatePnr()
        if(pervPnr != curPnr){
            flightData.push(total_price.value,Qty.value,"2024-01-02",flight_Name.innerText)
            console.log(flightData);
            localStorage.setItem(curPnr,flightData)
            localStorage.setItem("FLIGHT_ID",curPnr)
        }
        else generatePnr()
    }
}

function generatePnr(){
    return Math.floor(Math.random() * 101)
}