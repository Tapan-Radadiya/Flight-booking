const sourceDropDown = document.getElementById("Source")
const destinationDropDown = document.getElementById("Destination")
const departureDate = document.getElementById("departureDate")
const todayDate = new Date("2024-01-02")
const btnSearch = document.getElementById("btnSearch")
const txtSearch = document.getElementById("txtSearch")
const flightTable = document.getElementById("flightTable")

async function fetchData() {
  createTable()
  const FlightList = document.getElementById("FlightList")
  let data = await fetch("/data.json")
  data = await data.json()
  btnSearch.addEventListener("click", checkFlights)
  const source = data.sources
  const destination = data.destinations
  const flights = data.flights

  destination.forEach((element) => {
    const option = document.createElement("option")
    option.setAttribute("value", `${element.name}`)
    option.innerText = element.name
    destinationDropDown.appendChild(option)
  });

  source.forEach((element) => {
    const option = document.createElement("option")
    option.setAttribute("value", `${element.name}`)
    option.innerText = element.name
    sourceDropDown.appendChild(option)
  });

  flights.forEach((element) => {
    let curDate = new Date(element.departureDate)
    if (todayDate.getTime() <= curDate.getTime()) {
      const tableRow = document.createElement("tr")
      const flightName = document.createElement("td")
      const sourceName = document.createElement("td")
      const destinationName = document.createElement("td")
      const price = document.createElement("td")
      const bookingBtn = document.createElement("td")
      const bookBtn = document.createElement("button")
      bookBtn.innerText = "Book"
      bookBtn.addEventListener("click", validate)
      bookBtn.setAttribute("id", `bookBtn${element.flightID}`)

      const flightNameText = document.createTextNode(element.name)
      let sourceText
      const curSource = element.sourceID
      source.forEach((element) => {
        if (element.id == curSource) {
          sourceText = document.createTextNode(element.name)
        }
      })
      const curdestination = element.destinationID
      let destinationText
      destination.forEach((element) => {
        if (element.id == curdestination) {
          destinationText = document.createTextNode(element.name)
        }
      })
      const priceText = document.createTextNode(element.price)

      bookingBtn.appendChild(bookBtn)
      flightName.appendChild(flightNameText)
      sourceName.appendChild(sourceText)
      destinationName.appendChild(destinationText)
      price.appendChild(priceText)
      tableRow.append(flightName, sourceName, destinationName, priceText, bookingBtn)
      FlightList.appendChild(tableRow)
      function validate(event) {
        let curFlightId = bookBtn.id.slice(7,9)
        localStorage.setItem("FLIGHT_ID",curFlightId)
      }
    }
  })



  function checkFlights() {
    const sourceDropDownValue = sourceDropDown.value
    const destinationDropDownVal = destinationDropDown.value
    const departureDateVal = departureDate.value
    const txtSearchVal = txtSearch.value
    let FlightList = document.getElementById("FlightList")
    FlightList.innerHTML = ""
    createTable()

    if (!departureDateVal == "") {
      let userDate = new Date(departureDateVal)
      if (todayDate.getTime() <= userDate.getTime()) {
        let curSource
        let curDestination

        source.forEach((element) => {
          if (sourceDropDownValue == element.name) {
            curSource = element.id
          }
        })
        destination.forEach((element) => {
          if (destinationDropDownVal == element.name) {
            curDestination = element.id
          }
        })
        for (let i = 0; i < flights.length; i++) {
          let curDate = new Date(flights[i].departureDate)
          if (curDate.getTime() == userDate.getTime() && flights[i].sourceID == curSource && flights[i].destinationID == curDestination) {
            const tableRow = document.createElement("tr")
            const flightName = document.createElement("td")
            const sourceName = document.createElement("td")
            const destinationName = document.createElement("td")
            const price = document.createElement("td")
            const bookingBtn = document.createElement("td")
            const bookBtn = document.createElement("button")
            bookBtn.addEventListener("click", validate)
            bookBtn.setAttribute("id", `bookBtn${flights[i].flightID}`)
            bookBtn.innerText = "Book"
            // bookBtn.setAttribute("type", "button")

            const flightNameText = document.createTextNode(flights[i].name)

            let sourceText
            source.forEach((elemnt) => {
              if (curSource == elemnt.id) {
                sourceText = document.createTextNode(elemnt.name)
                return
              }
            })
            let destinationText
            destination.forEach((element) => {
              if (curDestination == element.id) {
                destinationText = document.createTextNode(element.name)
                return
              }
            })
            const priceText = document.createTextNode(flights[i].price);

            flightName.appendChild(flightNameText)
            sourceName.appendChild(sourceText)
            destinationName.appendChild(destinationText)
            price.appendChild(priceText)
            tableRow.append(flightName, sourceName, destinationName, price, bookBtn)
            FlightList.appendChild(tableRow)
            function validate(event) {
              let curFlightId = bookBtn.id.slice(7,9)
              localStorage.setItem("FLIGHT_ID",curFlightId)
            }
          }
          else {
            console.log("No flight Found");
          }
        }
      }
    }
    // Flights name search
    else {
      flights.forEach((element) => {
        let curDate = new Date(element.departureDate)
        if (todayDate.getTime() <= curDate.getTime()) {
          if (element.name == txtSearchVal) {
            const tableRow = document.createElement("tr")
            const flightName = document.createElement("td")
            const sourceName = document.createElement("td")
            const destinationName = document.createElement("td")
            const price = document.createElement("td")
            const bookingBtn = document.createElement("td")
            const bookBtn = document.createElement("button")
            bookBtn.innerText = "Book"
            // bookBtn.setAttribute("type", "button")
            bookBtn.addEventListener("click", validate)
            bookBtn.setAttribute("id", `bookBtn${element.flightID}`)
            const flightNameText = document.createTextNode(element.name)
            let sourceText
            const curSource = element.sourceID
            source.forEach((element) => {
              if (element.id == curSource) {
                sourceText = document.createTextNode(element.name)
              }
            })
            const curdestination = element.destinationID
            let destinationText
            destination.forEach((element) => {
              if (element.id == curdestination) {
                destinationText = document.createTextNode(element.name)
              }
            })
            const priceText = document.createTextNode(element.price)
            bookingBtn.appendChild(bookBtn)
            flightName.appendChild(flightNameText)
            sourceName.appendChild(sourceText)
            destinationName.appendChild(destinationText)
            price.appendChild(priceText)
            tableRow.append(flightName, sourceName, destinationName, priceText, bookingBtn)
            FlightList.append(tableRow)
            function validate(event) {
              let curFlightId = bookBtn.id.slice(7,9)
              localStorage.setItem("FLIGHT_ID",curFlightId)
            }
          }
        }
      })
    }
  }



  function createTable() {
    const table = document.getElementById("FlightList")
    const tableRow = document.createElement("tr")
    const tableHeading = document.createElement("th")
    tableHeading.setAttribute("colspan", "5")
    const tableHeadText = document.createTextNode("Flight Listing")
    tableHeading.appendChild(tableHeadText)
    tableRow.append(tableHeading)

    const tableColumnName = document.createElement("tr")
    const flightName = document.createElement("th")
    const sourceName = document.createElement("th")
    const destinatioName = document.createElement("th")
    const price = document.createElement("th")

    const flightNameText = document.createTextNode("Flight Name")
    const sourceText = document.createTextNode("Source Name")
    const destinationText = document.createTextNode("Destination")
    const priceText = document.createTextNode("Price")

    flightName.appendChild(flightNameText)
    sourceName.appendChild(sourceText)
    destinatioName.appendChild(destinationText)
    price.appendChild(priceText)

    tableColumnName.append(flightName, sourceName, destinatioName, price)
    table.append(tableRow, tableColumnName)
  }
   function validate(event) {
      let curFlightId = bookBtn.id.slice(7,8)
      console.log(curFlightId);
    }
}
fetchData()

