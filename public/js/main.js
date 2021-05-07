const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const toggle = document.querySelector('.toggle') //reg added this for dark mode



// DELETE REVIEW
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteReview)
})

async function deleteReview(){
    console.log('delete works')
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('reviews/deleteReview', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// LIKES
likes = document.querySelectorAll('.fa-thumbs-up')

for( like of likes )
  like.addEventListener('click', addLike)

async function addLike(){

  li = this.parentNode
  id = li.dataset.id
  
  res = await fetch('/reviews/addLike', {
    method: 'put',
    headers: {'content-type': 'application/json'},
    body:JSON.stringify({
      id: id
    })
  })

  location.reload()

}

//for dark mode stuff
//let state = 'light'

toggle.addEventListener('click', (e) => {
    const html = document.querySelector('html')
   
   /*
    if( state == 'light'){
      state = 'dark'
      console.log(state)
    }
    
    else//( state == 'dark')
      state = 'light'
      console.log(state)
    */
  

    if(html.classList.contains('dark')) {
        html.classList.remove('dark')
        e.target.innerHTML = 'Dark mode'
    } else {
        html.classList.add('dark')
        e.target.innerHTML = 'Light mode'
    }
})