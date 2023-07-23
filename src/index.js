// write your code here
let ramenDiv= document.getElementById("ramen-menu")
let imageName= document.querySelector("#ramen-detail h2")
let imageRestaurant= document.querySelector("#ramen-detail h3")

let ratingDisplay= document.querySelector("#rating-display")

let commentDisplay= document.querySelector("#comment-display")
let form=document.querySelector("#new-ramen")

document.addEventListener("DOMContentLoaded" ,()=>{
    console.log("loaded")
    fetchImages()
    fetch(`http://localhost:3000/ramens/2`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        imageName.innerHTML=data.name
        imageRestaurant.innerHTML=data.restaurant
        ratingDisplay.innerHTML=data.rating
        commentDisplay.innerHTML=data.comment

    }).catch(e=>console.log(e))

    form.addEventListener("submit", (e)=>{
        let body={}
        e.preventDefault()
        console.log(e.target)
        let inputs=e.target.querySelectorAll(".input-text")
        inputs.forEach(element => {
            body[`${element.name}`]=element.value
        });
        console.log(body)

        // create my image
        let image= document.createElement("img")
        image.setAttribute('src', `${body.image}`)
        // image.setAttribute('id', `${body.id}`)
        ramenDiv.appendChild(image)

        form.reset()

    })
})


const fetchImages=()=>{
    let imageData;
    fetch("http://localhost:3000/ramens")
    .then(res=>res.json()).then(
        data=> handleImage(data)
    )
    .catch(e=> console.log(e))

    return imageData;
}


const handleImage=(data)=>{
    data.map(ramen=>{
        let image= document.createElement("img")
        image.setAttribute('src', `${ramen.image}`)
        image.setAttribute('id', `${ramen.id}`)
        image.addEventListener("click", (e)=>{
            console.log(e.target)
            // let imageDetail=fetchImageDetail(parseInt(e.target.id))
            // console.log(imageDetail)
            fetch(`http://localhost:3000/ramens/${e.target.id}`)
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                imageName.innerHTML=data.name
                imageRestaurant.innerHTML=data.restaurant
                ratingDisplay.innerHTML=data.rating
                commentDisplay.innerHTML=data.comment

            }).catch(e=>console.log(e))
        })
        ramenDiv.appendChild(image);
    })
    
}

