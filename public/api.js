window.onload = function() {

  let refresh = document.getElementById("click")

   function reset(){

      fetch('https://api.giphy.com/v1/gifs/random?api_key=wltUx83cCzYPqCKFvIAKiL9GRtEg8kLV&tag=&rating=G')
      .then(res => res.json())
      .then(response =>{

          console.log("random api response: ",response);
          console.log("random api response: ",response.data.images.original.url);

          let spot = document.getElementById("gif")

          let save = document.getElementById("val")

          spot.src = response.data.images.original.url

          save.value = response.data.images.original.url

          console.log("image: ", spot, "input: ", save);

          } )

    }

  refresh.addEventListener("click", reset);

}

let change = document.getElementsByClassName("edit");
let remove = document.getElementsByClassName("delete");

Array.from(change).forEach(function(element) {
      element.addEventListener('click', function(){

        const img = element.getAttribute("data-img")
        const story = element.getAttribute("data-story")

        console.log(img,story)

        fetch('like', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'img': img,
            'story': story
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log("data", data)
          window.location.reload(true)
        })
      });
});


Array.from(remove).forEach(function(element) {
      element.addEventListener('click', function(){
        const img = element.getAttribute("data-img")
        const story = element.getAttribute("data-story")

        console.log("img: ", img, "story: ", story)

        fetch('stories', {
          method: 'delete',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'img': img,
            'story': story
          })
        }).then(function (response) {
              console.log(response)
              if(response.ok){
                return response.json()
              }else{
                console.log("could not delete")
              }
            }).then(function (data) {
              console.log("this is data", data)
          window.location.reload()
        })
      });
});


// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const userWeight = this.parentNode.parentNode.childNodes[1].innerText
//         const userDate = this.parentNode.parentNode.childNodes[3].innerText
//         let newUserWeight = document.getElementById('addText').value
//         console.log(newUserWeight)
//         fetch('deletePost', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'userWeight': userWeight,
//             'userDate': userDate
//           })
//         }).then(function (response) {
//           console.log(response)
//           if(response.ok){
//             return response.json()
//           }else{
//             console.log("could not delete")
//           }
//         }).then(function (data) {
//           window.location.reload()
//           // document.getElementById("error").innerHTML = data.message
//         })
//       });
// });
