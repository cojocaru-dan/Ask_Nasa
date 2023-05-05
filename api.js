const rootElement = document.getElementById("root");

const addElement = (tag, additionalInfo) => {
    if (tag === "img") {
        return `<${tag} src="${additionalInfo}" width="70%" height="70%">`;
    } else if (tag === "h1" || tag === "h4") {
        return `<${tag}>${additionalInfo}</${tag}>`;
    } else if (tag === "input") {
        return `<${tag} type="date"><br>`;
    }
}

const displayNextImage = async (newDateInput) => {
    // wait for response
    const imgObjectResponse = await getImageObj(newDateInput);
    // creeate html elements 
    const imgTag = addElement("img", `${imgObjectResponse.hdurl}`);
    const h1Tag = addElement("h1", `${imgObjectResponse.title}`);
    const h4Tag = addElement("h4", `${imgObjectResponse.explanation}`);
    // insert elements to html
    rootElement.insertAdjacentHTML("beforeend", imgTag);
    rootElement.insertAdjacentHTML("beforeend", h1Tag);
    rootElement.insertAdjacentHTML("beforeend", h4Tag);
}

const addChangeEvent = () => {
    document.querySelector("input").addEventListener("change", (event) => {
        // delete previous image if exists
        const alreadyDisplayedElements = document.querySelectorAll("div > img, h1, h4");
        for (const element of alreadyDisplayedElements) {
            element.remove();
        }
        // display next picked image
        displayNextImage(event.target.value);
    });
};

async function getImageObj(fromDate) {
    // create url with a specific date
    let nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=BaqqGTBNXdlQ4RTD890i3pIQblxhbIPVHl3L9SLo"; // "https://apod.nasa.gov/apod/astropix.html?api_key=BaqqGTBNXdlQ4RTD890i3pIQblxhbIPVHl3L9SLo";
    nasaUrl += "&date=" + fromDate;
    // send request and wait for response
    const resp = await fetch(nasaUrl);
    // extract the response body content as JSON
    const data = await resp.json();

    return data;
}


function main() {
    // create input element and insert to rootElement
    const inputTag = addElement("input");
    rootElement.insertAdjacentHTML("beforeend", inputTag);
    // add change event listener to input element
    addChangeEvent();

    // insert current day image
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1) < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    displayNextImage(`${currentYear}-${currentMonth}-${currentDay}`);
}

main();

