//global variable to store whatever breeds we will need to display on the DOM
const breeds = [];

//this event triggers when the page loads
document.addEventListener('DOMContentLoaded', function(){
    fetchImages()
    fetchBreeds()
})

//Challenge 1
function fetchImages(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

    fetch(imgUrl)
    .then(resp => resp.json())
    .then(data => {
        //first thing you always want to print the data!
        //console.log(data)

        data.message.forEach(url => {
            const img = document.createElement('img')
            img.src = url;
            document.querySelector('#dog-image-container').appendChild(img)
        })
        

    })
}

//Challenges 2 and 3
function fetchBreeds(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(data => {
        //first thing you always want to print the data!
        console.log(data)

        //alternative to Object.keys, in order to iterate over an object,
        //is the for-in loop

        //Object.keys ---> returns an array
        Object.keys(data.message).forEach(breed => {
            const ul = document.querySelector('#dog-breeds')
            const li = document.createElement('li')
            li.textContent = breed;

            li.addEventListener("click", function(e){
                //e.target.style.color = 'blue'
                //li.style.color = 'pink'
                this.style.color = "orange"
            })
            //slap the li's onto the <ul> that is on the DOM!
            ul.appendChild(li)
            breeds.push(breed)
        })
        filter(breeds)
    })
}

//Challenge 4 - wasnt loading the data in time for me to add the eventlistener

function filter(breeds){
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
      //filterBreeds(event.target.value);
      let ul = document.querySelector('#dog-breeds');
      
      
      if(event.target.value !== ''){
          //emptying the ul, so we can only display the breeds we want
            ul.innerHTML=""
            const firstLetter = event.target.value;
            //.filter() returns an array. so newBreeds is an array
            //if the breed starts with 'event.target.value', then add it to newBreeds
            let newBreeds = breeds.filter(breed => breed.startsWith(firstLetter))
            //console.log(newBreeds)

            //inside of this loop, we're recreating the list with only
            //the breeds that we want
            newBreeds.forEach(breed => {
                const li = document.createElement('li')
                li.innerText = breed;
                ul.append(li)
            })
      }
    });
  }



/*console.log('%c HI', 'color: firebrick')

fetch('https://dog.ceo/api/breeds/image/random/4')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.message.forEach(dogUrl => {
        const image = document.createElement('img');
        image.src = dogUrl;
        document.getElementById('dog-image-container').append(image);
    })
})



fetch('https://dog.ceo/api/breeds/list/all')
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    
    for (const breedList in data.message) {
        console.log(`${breedList}: ${data.message[breedList]}`);
        const breed = document.createElement('li');
        breed.textContent = breedList;
        
        breed.addEventListener("click",function(){
            if(breed.style.color == 'red'){
                breed.style.color = 'black';
            }
            else {
                breed.style.color = 'red'
            }
        })
    
        document.getElementById('dog-breeds').append(breed)
        
    
      }
})

*/