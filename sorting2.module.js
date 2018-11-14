var axios = require('axios')
var readline = require('readline-sync')

function showMenu() {
  let input = readline.question('\n1. Tampilkan berdasarkan id (a-z) \n2. Tampilkan bedasarkan id (z-a) \n3. Tampilkan berdasarkan nama (a-z) \n4. Tampilkan berdasarkan nama (z-a) \n5. Tampilkan berdasarkan email (a-z) \n6. Tampilkan berdasarkan email (z-a) \n7. Cari \nMasukkan pilihan: ')
  axios.get('http://jsonplaceholder.typicode.com/comments')
    .then(response => showData(input, response.data))
    .catch(function (error) {
      console.log(error);
    })
}

function showData(input, data) {
  let comments
  if (input === '1') {
    comments = data
  } else if (input === '2') {
    comments = sortComments(data, 'id', 'desc')
  } else if (input === '3') {
    comments = sortComments(data, 'name', 'asc')
  } else if (input === '4') {
    comments = sortComments(data, 'name', 'desc')
  } else if (input === '5') {
    comments = sortComments(data, 'email', 'asc')
  } else if (input === '6') {
    comments = sortComments(data, 'email', 'desc')
  } else if (input === '7') {
    let keyword = readline.question('Masukkan kata kunci: ')
    comments = searchComments(data, keyword)
  } else {
    return
  }

  console.log('Total : ', comments.length)
  let currentPage = 1
  console.log(comments.slice((currentPage - 1) * 10, currentPage * 10))
  if (comments.length > 10) {
    askPageNav(comments, currentPage)
  } else {
    sorting2.showMenu()
  }
}

function searchComments(comments, keyword) {
  let search = comments.filter(el => el.body.includes(keyword))
  return search
}

function sortComments(comments, sortBy, format) {
  comments.sort(function (a, b) {
    let comparerA = a[sortBy]
    let comparerB = b[sortBy]
    if (comparerA < comparerB) {
      return format === 'asc' ? -1 : 1;
    }
    if (comparerA > comparerB) {
      return format === 'asc' ? 1 : -1;
    }
    return 0;
  })

  return comments
}

function askPageNav(comments, currentPage) {
  let askPage = readline.question('\n1. Sebelumnya \n2. Selanjutnya \n3. Menu Utama \nMasukkan pilihan: ')
  if (askPage === '1') {
    currentPage--
    console.log('Total : ', comments.length)
    console.log(showWithPage(comments, (currentPage - 1) * 10, currentPage * 10))
    askPageNav(comments, currentPage)
  } else if (askPage === '2') {
    currentPage++
    console.log('Total : ', comments.length)
    console.log(showWithPage(comments, (currentPage - 1) * 10, currentPage * 10))
    askPageNav(comments, currentPage)
  } else {
    showMenu()
  }
}

function showWithPage(comments, start, end) {
  return comments.slice(start, end)
}

let sorting2 = {showMenu, sortComments, showData}
module.exports = sorting2