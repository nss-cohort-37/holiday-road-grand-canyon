
import { getParks, useParks } from "./ParkProvider.js"
import parkComponent from "./Park.js"
import  ParkSelect  from "./ParkSelect.js"
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".park__card")
const contentElement = document.querySelector(".filters__parks")


eventHub.addEventListener("stateSelected", event => {
    contentElement.innerHTML = ""

    getParks(event.detail.state).then(ParkSelect)

})



const ParkListComponent = () => {

    eventHub.addEventListener("parkSelected", event => {
        const parksCollection = useParks()
        const park = event.detail.park
        console.log(park)
         const matchingPark = parksCollection.filter(
             (currentPark) => {
                 if (currentPark.fullName === park) {
                   return currentPark
                    

                 }

             }

             
         )
         console.log(matchingPark)
         render(matchingPark)


    })

    eventHub.addEventListener("click", event => {
      if (event.target.id.startsWith("parkButton__")) {
        const dialogSiblingSelector = `#${event.target.id}+dialog`;
        const theDialog = document.querySelector(dialogSiblingSelector);
        theDialog.showModal();
      } else if (event.target.classList.contains("close__dialog")) {
        const dialogElement = event.target.parentNode;
        dialogElement.close();
      }
    });


    const render = (taco) => {
        contentTarget.innerHTML =

            `${taco.map(currentTaco => {
            return parkComponent(currentTaco) }) 
            }  `
    }
}

export default ParkListComponent