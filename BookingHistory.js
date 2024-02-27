localStorage.removeItem("FLIGHT_ID")
const localStorageLen = localStorage.length
const tblHistory = document.getElementById("tblHistory")



for (let i = 0; i < localStorageLen ; i++) {
    const flightKey = localStorage.key(i)
    const flightData = localStorage.getItem(flightKey)
    const tableRow = document.createElement("tr")
    const pnr = document.createElement("td")
    const depart_date = document.createElement("td")
    const price = document.createElement("td")
    const person = document.createElement("td")
    const book_date = document.createElement("td")
    const flight_name = document.createElement("td")
    const cancelBtn = document.createElement("button")
    cancelBtn.setAttribute("id", `cancel${flightKey}`)
    cancelBtn.textContent = "Cancel"
    cancelBtn.setAttribute("style", "width:100px;height:50px;margin-top:20px;margin:30px;")
    cancelBtn.addEventListener("click", cancelTrip)

    let [depart, total_price, total_person, booking_date, flightName] = flightData.split(",")

    const pnrTextNode = document.createTextNode(flightKey)
    const departDateText = document.createTextNode(depart)
    const priceText = document.createTextNode(total_price)
    const personText = document.createTextNode(total_person)
    const bookingDateText = document.createTextNode(booking_date)
    const flightNameText = document.createTextNode(flightName)

    pnr.appendChild(pnrTextNode)
    depart_date.appendChild(departDateText)
    price.appendChild(priceText)
    person.appendChild(personText)
    book_date.appendChild(bookingDateText)
    flight_name.appendChild(flightNameText)
    tableRow.append(pnr, flight_name, price, person, book_date, depart_date, cancelBtn)
    tblHistory.appendChild(tableRow)


    function cancelTrip() {
        const pnrNo = cancelBtn.id.slice(6, 8)
        const departDate = new Date(depart)
        const todaysDate = new Date("2024-01-02")
        if (departDate.getTime() === todaysDate.getTime()) {
            alert("You cant cancel todays ticket")
            return
        }
        const userDecision = confirm("Are you sure you want to cancel the ticket?")
        if (userDecision) {
            localStorage.removeItem(pnrNo)
            window.location.reload()
        }
    }
}

